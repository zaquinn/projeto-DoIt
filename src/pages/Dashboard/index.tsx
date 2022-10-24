import {
  Box,
  Center,
  Grid,
  Heading,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";
import { useAuth } from "../../contexts/AuthContext";
import { useTasks } from "../../contexts/TasksContext";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const Dashboard = () => {
  const { signOut, user, accessToken } = useAuth();
  const { tasks, loadTasks, notFound, taskNotFound } = useTasks();
  const [loading, setLoading] = useState(true);
  const {
    isOpen: isTaskDetailOpen,
    onClose: onTaskDetailClose,
    onOpen: onTaskDetailOpen,
  } = useDisclosure();
  const [selectedTask, setSelectedTask] = useState<Task>({} as Task);

  useEffect(() => {
    loadTasks(user.id, accessToken).then((res) => setLoading(false));
  }, []);

  const handleClick = (task: Task) => {
    setSelectedTask(task);
    onTaskDetailOpen();
  };

  if (notFound) {
    return (
      <>
        <ModalTaskDetail
          isOpen={isTaskDetailOpen}
          onClose={onTaskDetailClose}
          task={selectedTask}
        />
        <Box>
          <Header />
          <SearchBox />
          <Center mt="4" textAlign="center" display="flex" flexDir="column">
            <Heading size="lg">Não encontramos resultados para:</Heading>
            <Text fontSize="xl" color="gray.300" fontWeight="bold">
              {taskNotFound}
            </Text>
            <Box
              mt="6"
              w={["80%", "40%"]}
              padding="6"
              boxShadow="base"
              bgColor="white"
            >
              <Stack>
                <Skeleton
                  startColor="gray.100"
                  endColor="gray.200"
                  height="20px"
                  borderRadius="20px"
                  w="70%"
                />
                <Skeleton
                  startColor="gray.100"
                  endColor="gray.200"
                  height="20px"
                  borderRadius="20px"
                  w="50%"
                />
              </Stack>
              <Stack mt="8">
                <Skeleton
                  startColor="gray.100"
                  endColor="gray.200"
                  height="15px"
                  borderRadius="20px"
                />
                <Skeleton
                  startColor="gray.100"
                  endColor="gray.200"
                  height="15px"
                  borderRadius="20px"
                />
              </Stack>
            </Box>
          </Center>
        </Box>
      </>
    );
  }
  return (
    <>
      <ModalTaskDetail
        isOpen={isTaskDetailOpen}
        onClose={onTaskDetailClose}
        task={selectedTask}
      />
      <Box>
        <Header />
        <SearchBox />
        <Grid
          w="100%"
          templateColumns={[
            "repeat(auto-fill, minmax(300px, 1fr))",
            "repeat(auto-fill, minmax(420px, 1fr))",
          ]}
          gap={10}
          px={["2", "8"]}
          mt="8"
        >
          {loading ? (
            <CardSkeleton repeatCount={6} />
          ) : (
            tasks.map((task, index) => (
              <Card task={task} key={index} onClick={handleClick} />
            ))
          )}
        </Grid>
      </Box>
    </>
  );
};
