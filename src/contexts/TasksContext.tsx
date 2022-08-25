import { AxiosResponse } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { api } from "../services/api";

interface ITaskProviderProps {
  children: ReactNode;
}

interface ITask {
  id: string;
  title: string;
  description: string;
  userId: string;
  completed: boolean;
}

interface ITaskContextData {
  tasks: ITask[];
  createTask: (data: Omit<ITask, "id">, accessToken: string) => Promise<void>;
}

const TaskContext = createContext<ITaskContextData>({} as ITaskContextData);

const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks must be used within an TaskProvider");
  }
  return context;
};

const TaskProvider = ({ children }: ITaskProviderProps) => {
  const [tasks, setTasks] = useState<ITask[]>([]);

  const createTask = useCallback(
    async (data: Omit<ITask, "id">, accessToken: string) => {
      api
        .post("/tasks", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<ITask>) =>
          setTasks((oldTasks) => [...oldTasks, response.data])
        )
        .catch((err) => console.log(err));
    },
    []
  );

  return (
    <TaskContext.Provider value={{ tasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export { useTasks, TaskProvider };
