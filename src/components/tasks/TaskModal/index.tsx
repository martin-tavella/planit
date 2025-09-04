"use client";

import {
  X,
  Calendar,
  Clock,
  CheckCircle,
  Circle,
  Trash2,
  Edit3,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Task } from "@/types/task";
import getStatusStyles from "./utils/getStatusStyles";
import getPriorityStyles from "./utils/getPriorityStyles";

interface TaskModalProps {
  task: Task;
  onClose: () => void;
  onDelete: (taskId: number) => void;
  onStatusChange: (taskId: number, newStatus: Task["status"]) => void;
}

export default function TaskModal({
  task,
  onClose,
  onDelete,
  onStatusChange,
}: TaskModalProps) {
 
  const priorityStyles = getPriorityStyles(task.priority);
  const statusStyles = getStatusStyles(task.status!);

  const formatCreatedDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDeadline = (dateString: string) => {
    if (dateString) {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } else {
      return "No deadline set";
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task.id);
      onClose();
    }
  };

  const statusOptions = [
    {
      value: "pending",
      label: "Pending",
      icon: <Circle className="w-4 h-4" />,
    },
    {
      value: "in-progress",
      label: "In Progress",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      value: "completed",
      label: "Completed",
      icon: <CheckCircle className="w-4 h-4" />,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 mt-[9vh]">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] sm:max-h-[90vh] overflow-y-auto border border-[#a98af7]/20">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-[#1d0c37] to-[#2a1548] p-6 rounded-t-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-[#a98af7]/10 to-[#c4b5fd]/10 rounded-t-3xl" />

          <div className="relative flex items-start justify-between">
            <div className="flex-1 pr-4">
              <h1 className="text-2xl font-bold text-white mb-2 leading-tight">
                {task.title}
              </h1>
              <div className="flex items-center space-x-3">
                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${statusStyles.bg} ${statusStyles.text} ${statusStyles.border}`}
                >
                  {statusStyles.icon}
                  <span className="text-sm font-medium capitalize">
                    {task.status!.replace("-", " ")}
                  </span>
                </div>

                <div
                  className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${priorityStyles.dot}`}
                  />
                  <span className="text-sm font-medium capitalize">
                    {task.priority} Priority
                  </span>
                </div>
              </div>
            </div>

            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-[#1d0c37] mb-3 flex items-center">
              <Edit3 className="w-5 h-5 mr-2 text-[#a98af7]" />
              Description
            </h3>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-gray-700 leading-relaxed">
                {task.description || "No description provided for this task."}
              </p>
            </div>
          </div>

          {/* Created Date */}
          <div>
            <h3 className="text-lg font-semibold text-[#1d0c37] mb-3 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-[#a98af7]" />
              Deadline
            </h3>
            <div className="bg-[#a98af7]/5 rounded-xl p-4 border border-[#a98af7]/20">
              <p className="text-[#1d0c37] font-medium">
                {formatDeadline(task.deadline!)}
              </p>
            </div>
          </div>

          {/* Task Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-[#a98af7]/10 to-[#c4b5fd]/10 rounded-xl p-4 border border-[#a98af7]/20">
              <h4 className="font-semibold text-[#1d0c37] mb-2">Created at</h4>
              <p className="text-sm text-gray-600 font-mono">
                {formatCreatedDate(task.createdAt)}
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#c4b5fd]/10 to-[#a98af7]/10 rounded-xl p-4 border border-[#a98af7]/20">
              <h4 className="font-semibold text-[#1d0c37] mb-2">
                Last Updated
              </h4>
              <p className="text-sm text-gray-600">Just now</p>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="bg-gray-50 p-6 rounded-b-3xl border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            {/* Status Change Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-white border-[#a98af7]/30 text-[#1d0c37] hover:bg-[#a98af7]/10 hover:border-[#a98af7] transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Change Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-[#a98af7]/20">
                {statusOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.value}
                    onClick={() =>
                      onStatusChange(task.id, option.value as Task["status"])
                    }
                    className="hover:bg-[#a98af7]/10 focus:bg-[#a98af7]/10 flex items-center space-x-2"
                  >
                    {option.icon}
                    <span>{option.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Action Buttons */}
            <div className="flex items-center space-x-3">
              <Button
                onClick={handleDelete}
                variant="outline"
                className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 bg-white transition-all duration-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Task
              </Button>

              <Button
                onClick={onClose}
                className="bg-gradient-to-r from-[#a98af7] to-[#c4b5fd] hover:from-[#9575cd] hover:to-[#b39ddb] text-white font-medium px-6 transition-all duration-300 transform hover:scale-105"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
