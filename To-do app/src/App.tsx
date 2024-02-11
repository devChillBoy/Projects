import { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodoProvider } from './contexts';

export interface Todos {
  id: string;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todos[]>([]);

  const notCompletedTodos = todos.filter((todo) => !todo.completed).length;

  function addTodo(todo: Todos) {
    setTodos((prev) => [{ ...todo }, ...prev]);
  }

  function updateTodo(id: string, todo: Todos) {
    setTodos((prev) => prev.map((item) => (item.id === id ? todo : item)));
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  }

  function removeCompleted() {
    setTodos((prev) => prev.filter((item) => !item.completed));
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        removeTodo,
        toggleTodo,
      }}
    >
      <h1 className="head-title">To-do App</h1>
      <TodoForm />
      <TodoList todos={todos} />
      <div className="todos-left">
        <p>Todos Left : {notCompletedTodos}</p>
        <button onClick={removeCompleted}>Clear Completed</button>
      </div>
    </TodoProvider>
  );
}
export default App;
