import { Button, Center, Flex, useDisclosure } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { ModalCreateTask } from "../Modal/ModalCreateTask";
import { Input } from "./Input";

export const SearchBox = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <ModalCreateTask isOpen={isOpen} onClose={onClose} />
      <Flex
        mt="6"
        w="100%"
        px={["4", "8"]}
        py="2"
        pb="6"
        borderBottomWidth="1px"
        borderColor="gray.50"
      >
        <Flex as="form">
          <Input placeholder="Pesquisar por tarefa" w="35vw" name="title" />
          <Center
            borderRadius="8px"
            as="button"
            ml="2"
            w="65px"
            h="60px"
            fontSize="2xl"
            bg="purple.600"
          >
            <FaSearch color={theme.colors.white} />
          </Center>
        </Flex>
        <Button
          bg="purple.500"
          color="white"
          px="16"
          ml="4"
          h="60px"
          borderRadius="8px"
          onClick={onOpen}
          _hover={{ bg: "purple.600" }}
        >
          Adicionar uma nova tarefa
        </Button>
      </Flex>
    </>
  );
};
