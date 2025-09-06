"use client"

import { Task } from "@/types/task"

interface TaskListItemProps {
  task: Task
  onClick: (taskId: number) => void
}

export default function TaskListItem({ task, onClick }: TaskListItemProps) {

  return (
      <div
                    key={task.id}
                    onClick={() => onClick(task.id)}
                    className="p-4 bg-white/70 rounded-lg border border-[#a98af7]/20 hover:bg-white/90 hover:shadow-md transition-all duration-300 cursor-pointer hover:border-[#a98af7]/40"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-[#1d0c37]">{task.title}</h3>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            task.priority === "high"
                              ? "bg-red-100 text-red-800"
                              : task.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {task.priority}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in_progress"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {task.status!.replace("-", " ")}
                        </span>
                      </div>
                    </div>
                  </div>
  )
}