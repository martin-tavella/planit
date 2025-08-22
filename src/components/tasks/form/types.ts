import { TaskPriority } from "@/types/task";

export interface FormDataType {
  title: string;
  description?: string;
  priority: TaskPriority;
  deadline?: string;
} 

export interface ErrorsType {
  title?: string;
  description?: string;
  priority?: string;
  deadline?: string;
  general?: string;
}