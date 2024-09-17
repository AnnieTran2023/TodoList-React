export default function TodoTable(props) {
  return (
    <table style={{ width: "100%", marginTop: 15 }}>
      <tbody>
        <tr>
          <th>Due date</th>
          <th>Description</th>
        </tr>
        {props.todos.map((todo, index) => (
          <tr key={index}>
            <td>{todo.duedate}</td>
            <td>{todo.desc}</td>
            <td>
              <button onClick={() => props.handleDelete(index)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
