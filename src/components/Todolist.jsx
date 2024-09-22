import { useState } from "react";

import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css"; // Material Design theme

export default function Todolist() {
  const [todo, setTodo] = useState({ desc: "", duedate: "", priority: "Low" });
  const [todos, setTodos] = useState([]);

  const [columnDefs, setColumnDefs] = useState([
    { field: "duedate", floatingFilter: true, filter: true },
    { field: "desc", floatingFilter: true, filter: true },
    { field: "priority", floatingFilter: true, filter: true },
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

  const handleDelete = (index) => setTodos(todos.filter((_, i) => i !== index));

  return (
    <>
      <h3 style={{ background: "black", color: "white" }}>Simple Todolist</h3>
      <span>Description:</span>
      <input
        type="text"
        placeholder="Type todo here..."
        onChange={(event) => setTodo({ ...todo, desc: event.target.value })}
        value={todo.desc}
        style={{
          height: 35,
          marginRight: 20,
          marginLeft: 5,
        }}
      />
      <label htmlFor="priority" style={{ marginRight: 10 }}>
        Priority:
      </label>
      <select
        id="priority"
        onChange={(event) => setTodo({ ...todo, priority: event.target.value })}
        value={todo.priority}
        style={{
          height: 35,
          marginRight: 20,
          marginLeft: 5,
        }}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <span>Due date:</span>
      <input
        type="date"
        placeholder="Type due date..."
        onChange={(event) => setTodo({ ...todo, duedate: event.target.value })}
        value={todo.duedate}
        style={{
          height: 35,
          marginRight: 20,
          marginLeft: 5,
        }}
      />
      <button onClick={addTodo}>Add</button>
      <div className="ag-theme-material" style={{ width: 700, height: 500 }}>
        <AgGridReact rowData={todos} columnDefs={columnDefs} />
      </div>
    </>
  );
}
