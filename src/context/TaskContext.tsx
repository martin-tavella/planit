"use client";

import {
  createTaskService,
  deleteTaskService,
  getTasksService,
  updateTaskService,
} from "@/services/task.service";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import { createContext, useContext, useEffect, useState } from "react";

interface CreateTaskData {
  title: string;
  description?: string;
  priority: TaskPriority;
  deadline?: string;
}

interface TasksContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  pages: number;
  currentPage: number;
  fetchTasks: (
    page?: number,
    limit?: number,
    priority?: TaskPriority | "any",
    status?: TaskStatus | "all",
    sort?: "ASC" | "DESC",
    search?: string
  ) => Promise<void>;
  createTask: (taskData: CreateTaskData) => Promise<void>;
  updateTask: (id: number, updatedData: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchTasks = async (
    page?: number,
    limit?: number,
    priority?: TaskPriority | "any",
    status?: TaskStatus | "all",
    sort?: "ASC" | "DESC",
    search?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getTasksService(
        page,
        limit,
        priority,
        status,
        sort,
        search
      )
      console.log(res)
      setTasks(res.tasks);
      setPages(res.totalPages);
      setCurrentPage(res.page);

      if (res.tasks.length === 0) {
      // Si no hay filtros activos
      const noFilters =
        (priority === undefined || priority === "any") &&
        (status === undefined || status === "all") &&
        (search === undefined || search === "");

      if (noFilters) {
        setError("No hay tareas creadas todavía.");
      } else {
        setError("No se encontraron tareas con esos filtros.");
      }
    }

    } catch {
      setError("Error loading the tasks :(");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData: CreateTaskData) => {
    setError(null);
    try {
      const newTask = await createTaskService({ ...taskData });

      setTasks((prev) => [...prev, newTask]);
    } catch {
      setError("Error creating the task");
    }
  };

  const updateTask = async (id: number, updatedData: Partial<Task>) => {
    setError(null);
    try {
      const updatedTask = await updateTaskService(id, updatedData);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? updatedTask : task))
      );
    } catch {
      setError("Error updating the task");
    }
  };

  const deleteTask = async (id: number) => {
    setError(null);
    try {
      await deleteTaskService(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      setError("Error deleting the task");
    }
  };

  useEffect(() => {
    setError(null);
    fetchTasks();
  }, []);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        error,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
        setCurrentPage,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasks must be used within an TasksProvider");
  }
  return context;
};
