"use client";
import { useTasks } from "@/context/TaskContext";
import { useEffect, useState } from "react";

const TasksList = () => {
  const { fetchTasks, tasks, loading, error } = useTasks();
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setMessage(error);
    }
    console.log(tasks)
  }, [error, fetchTasks, tasks]);

  const tasksNode = (
    <ul>
      {tasks?.map((task, index) => (
        <li key={index}>
          <p>{task.title}</p>
        </li>
      ))}
    </ul>
  );

  return (
    !loading  && !error ? tasksNode : "hoal"
  );
};

export default TasksList;
