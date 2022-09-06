import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FaCheck, FaTrash } from "react-icons/fa";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ICardTaskProps {
  task: Task;
}

export const Card = ({ task }: ICardTaskProps) => {
  return (
    <Box
      cursor="pointer"
      _hover={{ transform: "translateY(-7px)", borderColor: "gray.100" }}
      transition="border 0.2s, ease 0s, transform 0.2s"
      borderWidth="1px"
      borderColor="gray.50"
      boxShadow="base"
      padding="7"
      w={["320px", "auto"]}
    >
      <Flex justify="space-between">
        <Heading as="h1" size="md">
          {task.title}
        </Heading>
        <HStack spacing="4">
          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth="1px"
            borderRadius="5px"
            borderColor="gray.200"
            bg="white"
            color="gray.300"
            _hover={{ color: "gray.400" }}
          >
            <FaTrash />
          </Center>
          <Center
            as="button"
            w="30px"
            h="30px"
            borderWidth="1px"
            borderRadius="5px"
            borderColor="gray.200"
            bg="white"
            color="gray.300"
            _hover={{ color: "gray.400" }}
          >
            <FaCheck />
          </Center>
        </HStack>
      </Flex>
      <Box w="100%" mt="4">
        <Text>{task.description}</Text>
        <Progress
          colorScheme="purple"
          mt="2.5"
          value={task.completed ? 100 : 10}
        />
        <Text color="gray.200" mt="3">
          07 March 2021
        </Text>
      </Box>
    </Box>
  );
};
