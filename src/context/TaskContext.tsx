"use client";

import { createTaskService, deleteTaskService, getTasksService, updateTaskService } from "@/services/task.service";
import { Task, TaskPriority } from "@/types/task";
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
  fetchTasks: () => Promise<void>;
  createTask: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">
  ) => Promise<void>;
  updateTask: (id: number, updatedData: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const tasks = await getTasksService();
      if (!tasks) {
        setError("You don't have any tasks yet!");
        return;
      }
      setTasks(tasks);
    } catch {
      setError("Error loading the tasks :(");
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (
    taskData: CreateTaskData
  ) => {
    try {
      const newTask = await createTaskService({...taskData});
      
      setTasks((prev) => [...prev, newTask])
    } catch {
        setError('Error creating the task')
    }
  };

  const updateTask = async (id: number, updatedData: Partial<Task>) => {
    try {
        const updatedTask = await updateTaskService(id, updatedData);
        setTasks((prev) => prev.map((task) => task.id === id ? updatedTask : task ))
    } catch {
        setError('Error updating the task')
    }
  }

  const deleteTask = async (id: number) => {
    try {
        await deleteTaskService(id)
        setTasks((prev) => prev.filter((task) => task.id !== id))
    } catch {
        setError('Error deleting the task')
    }
  }

  useEffect(() => {
    setError(null)
    fetchTasks()
  }, [])

  return (
    <TasksContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
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
