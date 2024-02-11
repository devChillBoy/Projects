import { type Todos } from '../App';
import Todo from './Todo';

interface TodoListProps {
  todos: Todos[];
}

function TodoList({ todos }: TodoListProps) {
  return (
    <ul className="todos">
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          {...todo}
        />
      ))}
    </ul>
  );
}
export default TodoList;
