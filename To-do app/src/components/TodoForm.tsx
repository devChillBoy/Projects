import { useRef, type FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTodo } from '../contexts';

function TodoForm() {
  const todoTitle = useRef<HTMLInputElement>(null);
  const { addTodo } = useTodo();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!todoTitle.current) return;

    const todo = {
      id: uuidv4(),
      title: todoTitle.current.value,
      completed: false,
    };

    addTodo(todo);

    e.currentTarget.reset();
  }

  return (
    <form
      className="todo-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Add Todo..."
        ref={todoTitle}
      />
      <button>+</button>
    </form>
  );
}
export default TodoForm;
   