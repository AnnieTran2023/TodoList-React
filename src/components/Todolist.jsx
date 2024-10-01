import { useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

export default function Todolist() {
  const [todo, setTodo] = useState({ desc: "", duedate: "", priority: "Low" });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [columnDefs, setColumnDefs] = useState([
    { field: "duedate", floatingFilter: true, filter: true },
    { field: "desc", floatingFilter: true, filter: true },
    {
      field: "priority",
      floatingFilter: true,
      filter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
  ]);

  const addTodo = () => {
    if (!todo.desc) {
      alert("Type a valid todo!");
    } else if (!todo.duedate) {
      alert("Type a date!");
    } else {
      setTodos([todo, ...todos]);
      setTodo({ desc: "", duedate: "", priority: "" });
    }
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) => index != gridRef.current.getSelectedNodes()[0].id
        )
      );
    } else {
      alert("Select a row first!");
    }
  };

  return (
    <>
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
      >
        <TextField
          type="text"
          label="Enter todo"
          onChange={(event) => setTodo({ ...todo, desc: event.target.value })}
          value={todo.desc}
          variant="outlined"
        />
        <TextField
          select
          label="Priority"
          value={todo.priority}
          onChange={(event) =>
            setTodo({ ...todo, priority: event.target.value })
          }
          variant="outlined"
        >
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </TextField>
        <TextField
          label="Date"
          variant="outlined"
          onChange={(event) =>
            setTodo({ ...todo, duedate: event.target.value })
          }
          value={todo.duedate}
        />
        <Button variant="outlined" endIcon={<AddIcon />} onClick={addTodo}>
          Add
        </Button>
        <Button
          variant="outlined"
          color="error"
          endIcon={<DeleteIcon />}
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Stack>
      <div className="ag-theme-material" style={{ width: "100%", height: 500 }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowData={todos}
          columnDefs={columnDefs}
          rowSelection="single"
        />
      </div>
    </>
  );
}
