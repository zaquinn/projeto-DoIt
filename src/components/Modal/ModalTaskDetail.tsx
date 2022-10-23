import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from "@chakra-ui/react";
import { FaTimes, FaCheck, FaTrash, FaCube } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface IModalTaskDetailProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
}

export const ModalTaskDetail = ({
  isOpen,
  onClose,
  task,
}: IModalTaskDetailProps) => {
  const { deleteTask, updateTask } = useTasks();
  const { accessToken, user } = useAuth();

  const handleComplete = () => {
    updateTask(task.id, user.id, accessToken);
  };

  const handleDelete = () => {
    deleteTask(task.id, accessToken);
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding="2" bg="white" color="gray.800">
          <ModalHeader display="flex" justifyContent="space-between">
            <Flex>
              <Center bg="purple.500" w="30px" h="30px" borderRadius="5px">
                <FaCube color={theme.colors.white} />
              </Center>
              <Text fontWeight="bold" ml="2">
                Visualizar
              </Text>
            </Flex>
            <HStack spacing="2">
              <Center
                as="button"
                w="30px"
                h="30px"
                borderWidth="1px"
                borderRadius="5px"
                borderColor="gray.200"
                bg="white"
                color="gray.300"
                onClick={handleDelete}
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
                onClick={handleComplete}
              >
                <FaCheck />
              </Center>
              <Center
                onClick={onClose}
                as="button"
                ml="auto"
                w="32px"
                h="32px"
                bg="red.600"
                fontSize="lg"
                borderRadius="md"
                _hover={{ bg: "red.700" }}
              >
                <FaTimes color={theme.colors.white} />
              </Center>
            </HStack>
          </ModalHeader>
          <ModalBody color="gray.400">
            <Heading as="h1" fontSize="2xl">
              {task.title}
            </Heading>
            <Text>{task.description}</Text>
          </ModalBody>
          <Box p="6">
            <Progress colorScheme="purple" value={task.completed ? 100 : 10} />
            <Text color="gray.300" mt="3">
              7 March 2022
            </Text>
          </Box>
          <ModalFooter flexDirection="column"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
