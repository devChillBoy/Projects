import { createContext, useContext } from 'react';
import { Todos } from '../App';

export const TodoContext = createContext({
  todos: [
    {
      id: '',
      title: 'Learn React',
      completed: false,
    },
  ],
  addTodo: (_todo: Todos) => {},
  updateTodo: (_id: string, _todo: Todos) => {},
  removeTodo: (_id: string) => {},
  toggleTodo: (_id: string) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
