import { Task, TaskPriority } from "@/types/task";
import api from "./api";

interface CreateTaskData {
    title: string;
    description?: string;
    priority: TaskPriority;
    deadline?: string | Date;
}

export const getTasksService = async (): Promise<Task[]> => {
  const res = await api.get<Task[]>("/tasks");
  return res.data;
};

export const createTaskService = async (
  taskData: CreateTaskData
): Promise<Task> => {
  console.log(taskData);
  taskData.deadline = taskData.deadline ? new Date(taskData.deadline) : undefined;
  const res = await api.post('/tasks/create', taskData);
  console.log(res);
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