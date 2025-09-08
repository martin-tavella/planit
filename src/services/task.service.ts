import { Task, TaskPriority, TaskStatus } from "@/types/task";
import api from "./api";

interface CreateTaskData {
  title: string;
  description?: string;
  priority: TaskPriority;
  deadline?: string | Date;
}

interface getTasksFilters {
  page?: number;
  limit?: number;
  priority?: TaskPriority | "any";
  status?: TaskStatus | "all";
  sort?: 'ASC' | 'DESC';
  search?: string;
}

interface getTasksResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getTasksService = async (
  filters: getTasksFilters
): Promise<getTasksResponse> => {
  const { page, limit, priority, status, sort, search } = filters;
  const queries = new URLSearchParams();
  if (page) queries.append("page", page.toString());
  if (limit) queries.append("limit", limit.toString());
  if (priority && priority !== "any") queries.append("priority", priority);
  if (status && status !== "all") queries.append("status", status);
  if (sort) queries.append("sort", sort);
  if (search) queries.append("search", search);

  const res = await api.get<getTasksResponse>(`/tasks?${queries.toString()}`);
  return res.data;
};

export const createTaskService = async (
  taskData: CreateTaskData
): Promise<Task> => {
  taskData.deadline = taskData.deadline
    ? new Date(taskData.deadline)
    : undefined;
  const res = await api.post("/tasks/create", taskData);
  return res.data;
};

export const updateTaskService = async (
  id: number,
  updatedData: Partial<Task>
): Promise<Task> => {
  const res = await api.put(`/tasks/update/${id}`, updatedData);
  return res.data;
};

export const deleteTaskService = async (id: number): Promise<void> => {
  await api.delete(`/tasks/delete/${id}`);
};
