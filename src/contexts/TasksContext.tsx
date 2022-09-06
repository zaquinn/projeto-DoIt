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
  loadTasks: (userId: string, accessToken: string) => Promise<void>;
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

  const loadTasks = useCallback(async (userId: string, accessToken: string) => {
    try {
      const response = await api.get(`tasks?userId=${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const createTask = useCallback(
    async (data: Omit<ITask, "id">, accessToken: string) => {
      api
        .post("/tasks", data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<ITask>) => {
          console.log(response.data);
          setTasks((oldTasks) => [...oldTasks, response.data]);
        })
        .catch((err) => console.log(err));
    },
    []
  );

  return (
    <TaskContext.Provider value={{ tasks, createTask, loadTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export { useTasks, TaskProvider };
