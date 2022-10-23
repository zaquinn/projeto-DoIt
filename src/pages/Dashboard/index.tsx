import { Box, Grid, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { ModalTaskDetail } from "../../components/Modal/ModalTaskDetail";
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
  const { tasks, loadTasks } = useTasks();
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
          templateColumns="repeat(auto-fill, minmax(420px, 1fr))"
          gap={10}
          px="8"
          mt="8"
        >
          {tasks.map((task, index) => (
            <Card task={task} key={index} onClick={handleClick} />
          ))}
        </Grid>
      </Box>
    </>
  );
};
