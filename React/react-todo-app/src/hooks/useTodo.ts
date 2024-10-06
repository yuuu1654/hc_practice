import { ChangeEvent, useContext, useState } from "react";
import { Todo } from "../types/todo";
import { useDisclosure } from "@chakra-ui/react";
import { TodoContext } from "../providers/TodoProvider";

export const useTodo = () => {
  /**
   * todos に関する操作の責務を持つ
   * TodoContext から todos, setTodosを取得
   * useContextは、コンポーネントでContextの読み取りと、サブスクライブを行うためのReactフック
   */
  const todoContext = useContext(TodoContext)

  if (!todoContext) {
    throw new Error("TodoContextが見つかりません")
  }

  const { todos, setTodos } = todoContext;

  const [inputText, setInputText] = useState("");
  const [editTodo, setEditTodo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) =>
    setInputText(e.target.value);

  const onClickCreateTodo = (inputText: string) => {
    if (inputText === "") {
      onOpen();
      return;
    }
    const newTodo: Todo = {
      content: inputText,
      isCompleted: false,
      isEditing: false,
    };
    setTodos([...todos, newTodo]);
    console.log(inputText); // vvvと表示された
    setInputText("");
    console.log("todos", todos) // 更新されている
  };

  // 編集ボタン押した時にcall
  const onClickEditTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].isEditing = true;
    setEditTodo(updatedTodos[index].content); // 編集ボタン押した時にtodoの内容を表示する
  };

  const onChangeEditTodo = (e: ChangeEvent<HTMLInputElement>) =>
    setEditTodo(e.target.value);

  const onClickSaveTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].content = editTodo;
    updatedTodos[index].isEditing = false;
    setEditTodo("");
  };

  const onClickDeleteTodo = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos([...updatedTodos]);
  };

  const onChangeCheckbox = (
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    // todo: チェックボックスがチェックされてるかでフラグを切り替えてるだけなので、toggleとかで切り替えるようリファクタ
    if (e.target.checked) {
      const updatedTodos = [...todos];
      updatedTodos[index].isCompleted = true;
      setTodos([...updatedTodos]);
    } else {
      const updateTodos = [...todos];
      updateTodos[index].isCompleted = false;
      setTodos([...updateTodos]);
    }
  };

  return {
    inputText,
    editTodo,
    todos,
    onChangeTodo,
    onClickCreateTodo,
    onClickEditTodo,
    onChangeEditTodo,
    onClickSaveTodo,
    onClickDeleteTodo,
    onChangeCheckbox,
  };
};
