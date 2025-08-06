import { Task } from "@/types/task";
import api from "./api";

export const getTasksService = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/tasks");
  return res.data;
};

export const createTaskService = async (
  taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">
): Promise<Task> => {
  console.log(taskData);
  const res = await api.post('/tasks/create', taskData);
  return res.data;
};

export const updateTaskService = async (id: number, updatedData: Partial<Task>): Promise<Task> => {
    console.log(updatedData); 
    const res = await api.put(`/tasks/update/${id}`, updatedData);
    return res.data
}

export const deleteTaskService = async (id: number): Promise<void> => {
    await api.delete(`/tasks/delete/${id}`);
}