import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import { useTodo } from '../../hooks/useTodo';

export const TodoProgress = () => {
  const { todos } = useTodo();
  return (
    <Box bg={"teal.200"} textAlign={"left"} pl={4} py={3}>
      <UnorderedList>
        <ListItem>全てのタスク: {todos.length}</ListItem>
        <ListItem>
          完了済み:{" "}
          {todos.filter((todo) => todo.isCompleted === true).length}
        </ListItem>
        <ListItem>
          未完了:{" "}
          {todos.filter((todo) => todo.isCompleted === false).length}
        </ListItem>
      </UnorderedList>
    </Box>
  )
}

