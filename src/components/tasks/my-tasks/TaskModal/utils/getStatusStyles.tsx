import { CheckCircle, Circle, Clock } from "lucide-react";

const getStatusStyles = (status: string) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-green-100",
          text: "text-green-800",
          border: "border-green-200",
          icon: <CheckCircle className="w-4 h-4" />,
        };
      case "in-progress":
        return {
          bg: "bg-blue-100",
          text: "text-blue-800",
          border: "border-blue-200",
          icon: <Clock className="w-4 h-4" />,
        };
      case "pending":
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
          icon: <Circle className="w-4 h-4" />,
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          border: "border-gray-200",
          icon: <Circle className="w-4 h-4" />,
        };
    }
  };

export default getStatusStyles;