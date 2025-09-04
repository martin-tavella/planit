const getPriorityStyles = (priority: string) => {
  switch (priority) {
    case "high":
      return {
        bg: "bg-red-100",
        text: "text-red-800",
        border: "border-red-200",
        dot: "bg-red-500",
      };
    case "mid":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800",
        border: "border-yellow-200",
        dot: "bg-yellow-500",
      };
    case "low":
      return {
        bg: "bg-green-100",
        text: "text-green-800",
        border: "border-green-200",
        dot: "bg-green-500",
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800",
        border: "border-gray-200",
        dot: "bg-gray-500",
      };
  }
};

export default getPriorityStyles;
