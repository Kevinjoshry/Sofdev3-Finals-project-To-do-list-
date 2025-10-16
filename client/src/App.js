import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos').then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    const res = await axios.post('http://localhost:5000/api/todos', { task });
    setTodos([...todos, res.data]);
    setTask('');
  };

  const toggleTodo = async (id) => {
    const res = await axios.put(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.map(t => (t.id === id ? res.data : t)));
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter(t => t.id !== id));
  };

  return (
    <div style={{ margin: 40 }}>
      <h1>📝 To-Do List</h1>
      <input value={task} onChange={e => setTask(e.target.value)} placeholder="Enter task..." />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span 
              onClick={() => toggleTodo(todo.id)}
              style={{ textDecoration: todo.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
