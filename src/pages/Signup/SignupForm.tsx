import { Box, Button, Grid, Heading, Text, VStack } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import {
  DeepMap,
  FieldError,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface SignupData {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
}

interface LoginFormProps {
  handleSignUp: () => void;
  errors: DeepMap<FieldValues, FieldError>;
  register: UseFormRegister<SignupData>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignUp,
  errors,
  register,
  loading,
}: LoginFormProps) => {
  return (
    <Grid
      as="form"
      mt={["4", "4", "0"]}
      w={["100%", "80%", "60%", "60%", "40%"]}
      padding="30px 15px"
      border="3px solid"
      borderColor="gray.100"
      bg="white"
      color="gray.900"
      onSubmit={handleSignUp}
    >
      <Heading size="lg">Bem vindo de volta!</Heading>
      <VStack spacing="5" mt="5">
        <Box w="100%">
          <Input
            icon={FaUser}
            placeholder="Digite seu nome"
            label="Nome"
            error={errors.name}
            {...register("name")}
          />
          <Input
            icon={FaEnvelope}
            placeholder="Digite seu login"
            label="Login"
            type="email"
            error={errors.email}
            {...register("email")}
          />
          {!errors.email && (
            <Text ml="1" mt="1" color="gray.300">
              Exemplo: nome@email.com
            </Text>
          )}
        </Box>
        <Input
          icon={FaLock}
          label="Senha"
          placeholder="Digite sua senha"
          error={errors.password}
          type="password"
          {...register("password")}
        />
        <Input
          icon={FaLock}
          label="Confirmação de senha"
          placeholder="Confirme sua senha"
          error={errors.confirm_password}
          type="password"
          {...register("confirm_password")}
        />
      </VStack>
      <VStack mt="4" spacing="5">
        <Button
          isLoading={loading}
          bg="purple.800"
          w="100%"
          color="white"
          h="60px"
          borderRadius="8px"
          _hover={{ bg: "purple.900" }}
          type="submit"
        >
          Entrar
        </Button>
        <Text color="gray.400">Ainda não possui uma conta?</Text>
        <Button
          bg="gray.100"
          w="100%"
          color="gray.300"
          h="60px"
          borderRadius="8px"
          _hover={{ bg: "gray.200" }}
        >
          Cadastrar
        </Button>
      </VStack>
    </Grid>
  );
};
