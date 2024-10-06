import { Box, Button, Checkbox, Input, Stack, Text } from "@chakra-ui/react";
import { useTodo } from "../../hooks/useTodo";

export const TodoList = () => {
  const {
    todos,
    onChangeCheckbox,
    onClickEditTodo,
    onClickDeleteTodo,
    onChangeEditTodo,
    onClickSaveTodo,
    editTodo,
  } = useTodo();

  return (
    <Box bg={"purple.300"}>
      {todos.map((todo, index) => (
        <Stack
          key={index}
          spacing={4}
          direction={"row"}
          bg={"cyan.100"}
          py={2}
          my={2}
          rounded={"md"}
          align={"center"}
        >
          <Checkbox
            size={"lg"}
            colorScheme="cyan"
            borderColor={"gray.500"}
            bg={"gray.50"}
            onChange={(e) => onChangeCheckbox(index, e)}
            isChecked={todo.isCompleted}
          />
          {todo.isEditing ? (
            <>
              <Input
                bg={"gray.50"}
                px={3}
                py={3}
                value={editTodo}
                onChange={onChangeEditTodo}
                autoFocus={true}
              />
              <Button
                bg={"purple.200"}
                _hover={{ opacity: 0.8 }}
                py={3}
                onClick={() => onClickSaveTodo(index)}
              >
                保存
              </Button>
            </>
          ) : (
            <>
              <Text
                as={"span"}
                bg={"gray.50"}
                rounded={"md"}
                border={"1px solid"}
                borderColor={"gray.200"}
                px={3}
                py={2}
                w={"full"}
                textAlign={"left"}
              >
                {todo.content}
              </Text>
              <Button
                colorScheme="blue"
                _hover={{ opacity: 0.8 }}
                py={3}
                onClick={() => onClickEditTodo(index)}
              >
                編集
              </Button>
            </>
          )}

          <Button
            colorScheme="red"
            _hover={{ opacity: 0.8 }}
            onClick={() => onClickDeleteTodo(index)}
          >
            削除
          </Button>
        </Stack>
      ))}
    </Box>
  );
};
