import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, updateTodo } from '../features/Todo/todoSlice';

function Todos() {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [newTodoText, setNewTodoText] = useState(''); // State for updated text

  const handleEditClick = (todoId) => {
    setEditingTodoId(todoId);
    setNewTodoText(todos.find((todo) => todo.id === todoId).text); // Pre-fill text
  };

  const handleUpdate = (todoId) => {
    if (newTodoText.trim()) { // Update only if text is not empty
      dispatch(updateTodo({ id: todoId, text: newTodoText }));
      setEditingTodoId(null);
      setNewTodoText(''); // Reset state after update
    }
  };

  const handleCancelUpdate = () => {
    setEditingTodoId(null); // Reset editing state to close update input
  };

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded ${
              editingTodoId === todo.id ? 'bg-gray-700' : '' // Highlight editing todo
            }`}
          >
            {editingTodoId === todo.id ? (
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                className="w-full px-2 py-1 border border-gray-500 rounded focus:outline-none focus:border-sky-500"
              />
            ) : (
              <div className="text-white">{todo.text}</div>
            )}
            <div className="flex space-x-2">
              {editingTodoId !== todo.id && (
                <button
                  onClick={() => handleEditClick(todo.id)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
              >
                Delete
              </button>
              {editingTodoId === todo.id && (
                <>
                  <button
                    onClick={() => handleUpdate(todo.id)}
                    className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancelUpdate}
                    className="text-white bg-gray-500 border-0 py-1 px-4 focus:outline-none hover:bg-gray-600 rounded text-md"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;