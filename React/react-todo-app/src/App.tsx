import "./App.css";
import {
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { AlertMessage } from "./components/organisms/AlertMessage";
import { InputTodo } from "./components/moleculus/InputTodo";
import { TodoList } from "./components/moleculus/TodoList";
import { TodoProvider } from "./providers/TodoProvider";
import { TodoProgress } from "./components/moleculus/TodoProgress";

function App() {
  return (
    <TodoProvider>
      <Flex bg={"green.100"} justify={"center"} align={""} height={"100vh"}>
        <Box bg={"blue.200"} w={"lg"} px={4} rounded={"lg"}>
          <Heading color="blue.700" textAlign={"left"} ml={2}>
            TODO List
          </Heading>
          <TodoProgress /> 
          <InputTodo />
          <TodoList />
        </Box>
      </Flex>

      
    </TodoProvider>
    
  );
}

export default App;
