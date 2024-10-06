import { Button, Flex, Input } from "@chakra-ui/react";
import { useTodo } from "../../hooks/useTodo";

export const InputTodo = () => {
  const { inputText, onChangeTodo, onClickCreateTodo } = useTodo();
  return (
    <Flex>
      <Input
        bg={"gray.50"}
        mr={2}
        placeholder="TODOを入力"
        value={inputText}
        onChange={onChangeTodo}
      />
      <Button
        color={"white"}
        bg={"cyan.500"}
        px={6}
        _hover={{ opacity: 0.8, cursor: "pointer" }}
        onClick={() => onClickCreateTodo(inputText)}
      >
        作成
      </Button>
    </Flex>
  );
};
