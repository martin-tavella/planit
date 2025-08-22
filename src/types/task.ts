export type TaskStatus = 'pending' | 'in_progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority: TaskPriority;
  deadline?: string; 
  createdAt: string;
  updatedAt: string;
  userId: number;
}