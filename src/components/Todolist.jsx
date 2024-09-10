import { useState } from "react";

export default function Todolist() {
  const [todo, setTodo] = useState({ desc: "", duedate: "" });
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (!todo.desc) {
      alert("Type a valid todo!");
    } else if (!todo.duedate) {
      alert("Type a date!");
    } else {
      setTodos([todo, ...todos]);
      setTodo({ desc: "", duedate: "" });
    }
  };

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
      <span>Due date:</span>
      <input
        type="text"
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
      <table style={{ width: "100%", marginTop: 15 }}>
        <tbody>
          <tr>
            <th>Due date</th>
            <th>Description</th>
          </tr>
          {todos.map((todo, index) => (
            <tr key={index}>
              <td>{todo.duedate}</td>
              <td>{todo.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
