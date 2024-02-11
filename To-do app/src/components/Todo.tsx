import { useRef, useState, type FormEvent } from 'react';
import { FaCheck } from 'react-icons/fa';
import { MdDeleteSweep, MdEdit } from 'react-icons/md';
import { useTodo } from '../contexts';

interface TodoProps {
  id: string;
  title: string;
  completed: boolean;
}

function Todo({ id, title, completed }: TodoProps) {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const editedTitle = useRef<HTMLInputElement>(null);

  const { removeTodo, toggleTodo, updateTodo } = useTodo();

  function editTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    updateTodo(id, {
      id,
      title: editedTitle.current!.value,
      completed,
    });

    setIsEditable(false);
  }

  function handleTodoClick() {
    toggleTodo(id);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={handleTodoClick}
      />
      {isEditable ? (
        <form onSubmit={editTodo}>
          <input
            type="text"
            ref={editedTitle}
            defaultValue={title}
          />

          <button>
            <FaCheck />
          </button>
        </form>
      ) : (
        <p className={completed ? 'completed' : ''}>{title}</p>
      )}
      <div>
        <button onClick={() => setIsEditable(!isEditable)}>
          <MdEdit />
        </button>
        <button onClick={() => removeTodo(id)}>
          <MdDeleteSweep />
        </button>
      </div>
    </li>
  );
}
export default Todo;
