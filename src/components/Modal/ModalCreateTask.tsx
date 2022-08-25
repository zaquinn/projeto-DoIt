import {
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaClipboard, FaTimes } from "react-icons/fa";
import { theme } from "../../styles/theme";
import { Input } from "../Form/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { TextArea } from "../Form/TextArea";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

interface IModalCreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

const createTaskSchema = yup.object().shape({
  title: yup.string().required("Campo obrigatório"),
  description: yup
    .string()
    .required("Campo obrigatório")
    .max(100, "Máximo de 100 caracteres"),
});

export const ModalCreateTask = ({ isOpen, onClose }: IModalCreateTaskProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(createTaskSchema),
  });

  const { user, accessToken } = useAuth();

  const { createTask } = useTasks();

  const handleCreateTask = (data: any) => {
    const newData = { ...data, userId: user.id, completed: false };

    console.log(newData);

    createTask(newData, accessToken);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          padding="2"
          bg="white"
          color="gray.800"
          as="form"
          onSubmit={handleSubmit(handleCreateTask)}
        >
          <ModalHeader display="flex">
            <Center bg="purple.500" w="30px" h="30px" borderRadius="5px">
              <FaClipboard color={theme.colors.white} />
            </Center>
            <Text fontWeight="bold" ml="2">
              Adicionar
            </Text>
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
          </ModalHeader>
          <ModalBody textAlign="center">
            <VStack spacing="5">
              <Input
                label="Título"
                error={errors.title}
                {...register("title")}
                placeholder="Digite o título"
              />
              <TextArea
                label="Descrição"
                error={errors.description}
                {...register("description")}
                placeholder="Digite a descrição"
              />
            </VStack>
          </ModalBody>

          <ModalFooter flexDirection="column">
            <Button
              type="submit"
              bg="purple.500"
              color="white"
              w="100%"
              _hover={{ bg: "purple.600" }}
              h="60px"
            >
              Adicionar tarefa
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
