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
  addTodo: (todo: Todos) => {},
  updateTodo: (id: string, todo: Todos) => {},
  removeTodo: (id: string) => {},
  toggleTodo: (id: string) => {},
});

export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = TodoContext.Provider;
