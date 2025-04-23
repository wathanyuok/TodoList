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
    <div>
      <h1>Todo List</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="เพิ่มงานใหม่"
      />
      <button onClick={addTodo}>เพิ่ม</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={e => setEditText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)}>บันทึก</button>
              </>
            ) : (
              <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                {todo.text}
              </span>
            )}
            <button onClick={() => startEdit(todo.id, todo.text)}>แก้ไข</button>
            <button onClick={() => deleteTodo(todo.id)}>ลบ</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
