import { Box, Grid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

export const Dashboard = () => {
  const { signOut, user, accessToken } = useAuth();
  const { tasks, loadTasks } = useTasks();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);
  return (
    <Box>
      <Header />
      <SearchBox />
      <Grid
        w="100%"
        templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
        gap={10}
        px="8"
        mt="8"
      >
        {tasks.map((task, index) => (
          <Card task={task} key={index} />
        ))}
      </Grid>
    </Box>
  );
};
