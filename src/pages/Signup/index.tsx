import { Flex } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { SignupInfo } from "./SignupInfo";
import { SignupForm } from "./SignupForm";

const signUpSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  email: yup.string().required("Email obrigatório").email("Email inválido"),
  password: yup.string().required("Senha obrigatória"),
  confirm_password: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .oneOf([yup.ref("password"), "Senhas não correspondem"]),
});

interface SignUpData {
  email: string;
  password: string;
  name: string;
  confirm_password: string;
}

export const Signup = () => {
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<SignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const handleSignIn = (data: SignUpData) => {
    console.log(data);
  };

  return (
    <Flex
      padding={["10px 15px", "10px 15px", "0px"]}
      alignItems="center"
      height={["auto", "auto", "100vh", "100vh"]}
      justifyContent="center"
      bgGradient={[
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-b, purple.800 65%, white 35%)",
        "linear(to-r, purple.800 65%, white 35%)",
      ]}
      color="white"
    >
      <Flex
        w={["100%", "100%", "90%", "65%"]}
        justifyContent="center"
        flexDirection={["column", "column", "row", "row"]}
        alignItems="center"
      >
        <SignupForm
          handleSignUp={handleSubmit(handleSignIn)}
          errors={errors}
          register={register}
          loading={loading}
        />
        <SignupInfo />
      </Flex>
    </Flex>
  );
};
