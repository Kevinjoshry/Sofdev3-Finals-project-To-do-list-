import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoCard from './components/TodoCard';

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos').then(res => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return;
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 to-purple-300">
      <TodoCard
        todos={todos}
        task={task}
        setTask={setTask}
        addTodo={addTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
