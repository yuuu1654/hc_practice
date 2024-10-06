import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "orange.400", // アプリ全体の背景色
        color: "gray.800",
        padding: 0,
        margin: 0,
      },
    },
  },
});
export default theme;
