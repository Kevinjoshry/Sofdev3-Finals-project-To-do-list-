const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let todos = [
  { id: 1, task: 'Learn Docker', completed: false },
  { id: 2, task: 'Finish Final Project', completed: false }
];

// --- Routes ---
app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const newTodo = { id: Date.now(), task: req.body.task, completed: false };
  todos.push(newTodo);
  res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (todo) todo.completed = !todo.completed;
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.json({ success: true });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
