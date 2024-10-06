import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { Todo } from "../types/todo";

type TodoContext = {
  todos: Array<Todo>;
  setTodos: Dispatch<SetStateAction<Array<Todo>>>;
}

export const TodoContext = createContext<TodoContext | undefined>(undefined);

type Props = {
  children: ReactNode;
}

export const TodoProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Array<Todo>>([])
  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  )
}
