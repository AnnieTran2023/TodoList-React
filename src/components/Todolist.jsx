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
import Box from "@mui/material/Box";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
      alert("Choose a date!");
    } else {
      setTodos([todo, ...todos]);
      setTodo({ desc: "", duedate: "", priority: "Low" });
    }
  };

  const handleDelete = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].rowIndex
        )
      );
    } else {
      alert("Select a row first!");
    }
  };

  const updateDate = (date) => {
    const dateFormat = dayjs(date).format("DD-MM-YYYY");
    console.log(dateFormat);
    setTodo({ ...todo, duedate: dateFormat });
  };

  return (
    <>
      <Stack direction="row" spacing={3} justifyContent="center">
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={(date) => updateDate(date)} />
        </LocalizationProvider>
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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        mt={4} // Adds some margin-top
        sx={{ width: "100%" }} // Makes sure the container takes full width
      >
        <div
          className="ag-theme-material"
          style={{ width: 600, height: 800 }} // Adjust the width to centralize
        >
          <AgGridReact
            ref={gridRef}
            onGridReady={(params) => (gridRef.current = params.api)}
            rowData={todos}
            columnDefs={columnDefs}
            rowSelection="single"
          />
        </div>
      </Box>
    </>
  );
}
