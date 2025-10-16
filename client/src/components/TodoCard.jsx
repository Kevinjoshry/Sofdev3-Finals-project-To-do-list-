import React from "react";

const TodoCard = ({ todos, task, setTask, addTodo, toggleTodo, deleteTodo }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-[400px]">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        My To-Do List 📝
      </h1>

      <div className="flex mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 rounded-l-lg border border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={addTodo}
          className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600 transition-colors"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3 max-h-[300px] overflow-y-auto">
        {todos.length === 0 && (
          <p className="text-gray-500 text-center">No tasks yet...</p>
        )}

        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-indigo-50 border border-indigo-200 p-3 rounded-lg hover:shadow-md transition"
          >
            <span
              onClick={() => toggleTodo(todo.id)}
              className={`cursor-pointer select-none ${
                todo.completed
                  ? "line-through text-gray-500"
                  : "text-gray-800 font-medium"
              }`}
            >
              {todo.task}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-500 hover:text-red-700 font-semibold"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoCard;
