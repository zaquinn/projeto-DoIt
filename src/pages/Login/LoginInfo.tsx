import { Grid, Heading, Image, Text } from "@chakra-ui/react";
import LogoPrimary from "../../assets/logo-primary.svg";

export const LoginInfo = () => {
  return (
    <Grid w={["100%", "100%", "50%", "50%"]} paddingRight="100px">
      <Image
        src={LogoPrimary}
        alt="Logo do Doit"
        boxSize={["120px", "120px", "150px"]}
      />
      <Heading as="h1" mt="4">
        O jeito fácil, grátis
      </Heading>
      <Text maxWidth="350px">
        Fléxivel e atrativo de gerenciar{" "}
        <b>seus projetos em uma única plataforma</b>
      </Text>
    </Grid>
  );
};
