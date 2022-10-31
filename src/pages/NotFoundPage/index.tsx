import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import NotFoundImg from "../../assets/NotFound.svg";

export const NotFoundPage = () => {
  const history = useHistory();
  return (
    <Flex
      padding={["10px 15px", "10px 15px", "0px"]}
      alignItems="center"
      height={["auto", "auto", "100vh", "100vh"]}
      justifyContent="space-evenly"
      flexDirection={["column-reverse", "column-reverse", "row"]}
    >
      <Box mt="4">
        <Heading mt="4">Oooops!</Heading>
        <Text mt="4">
          Não encontramos a página que você procurou
          <br />
          <b>vamos tentar novamente.</b>
        </Text>
        <Button
          mt="4"
          bg="red.600"
          h="60px"
          color="white"
          w="100%"
          _hover={{ bg: "red.700" }}
          onClick={() => history.push("/")}
        >
          Ir para minhas tarefas
        </Button>
      </Box>
      <Image mt={["4", "4", "0"]} src={NotFoundImg} />
    </Flex>
  );
};
