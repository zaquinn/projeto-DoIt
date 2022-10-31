import { Box, Grid } from "@chakra-ui/react";
import { Card } from "../../components/Card";
import { SearchBox } from "../../components/Form/SearchBox";
import { Header } from "../../components/Header";
import { CardSkeleton } from "../../components/Skeleton/CardSkeleton";

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface ITaskListProps {
  loading: boolean;
  handleClick: (tasks: Task) => void;
  tasks: Task[];
}

export const TaskList = ({ loading, tasks, handleClick }: ITaskListProps) => {
  return (
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
  );
};
