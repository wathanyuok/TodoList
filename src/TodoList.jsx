import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const startEdit = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: editText } : todo));
    setEditId(null);
    setEditText('');
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  };

  return (
    <div className="todo-center-fixed">
      <div className="todo-container">
        <h1 className="todo-title">Todo List</h1>
        <form
          className="todo-form"
          onSubmit={e => {
            e.preventDefault();
            addTodo();
          }}
        >
          <input
            className="todo-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="เพิ่มงานใหม่"
          />
          <button className="todo-add-btn" type="submit">เพิ่ม</button>
        </form>
        <ul className="todo-list">
          {todos.map(todo => (
            <li className="todo-item" key={todo.id}>
              <span className="todo-dot">•</span>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
              />
              {editId === todo.id ? (
                <>
                  <input
                    className="todo-input"
                    style={{ width: 100, marginLeft: 6 }}
                    value={editText}
                    onChange={e => setEditText(e.target.value)}
                  />
                  <button
                    className="todo-edit-btn"
                    style={{ marginLeft: 6 }}
                    onClick={() => saveEdit(todo.id)}
                  >บันทึก</button>
                </>
              ) : (
                <span
                  className="todo-status"
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    marginLeft: 8,
                    marginRight: 12
                  }}
                >
                  {todo.text}
                </span>
              )}
              <button
                className="todo-edit-btn"
                onClick={() => startEdit(todo.id, todo.text)}
              >แก้ไข</button>
              <button
                className="todo-delete-btn"
                onClick={() => deleteTodo(todo.id)}
              >ลบ</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
