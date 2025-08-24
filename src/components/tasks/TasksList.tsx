"use client";
import { useTasks } from "@/context/TaskContext";
import { useEffect, useState } from "react";

const TasksList = () => {
  const { fetchTasks, tasks, loading, error } = useTasks();
  const [message, setMessage] = useState<string | null>(null);
  const [toggleFilters, setToggleFilters] = useState(false);


  useEffect(() => {
    if (error) {
      setMessage(error);
    }
    console.log(tasks)
  }, [error, fetchTasks, tasks]);


  const filtersNode = toggleFilters && (
    <div>

    </div>
  )  

  const tasksNode = (
    <main>

    <ul>
      {tasks?.map((task, index) => (
        <li key={index}>
          <p>{task.title}</p>
        </li>
      ))}
    </ul>
      </main>
  );

  return (
    <main className="min-h-screen min-w-screen mt-20 pt-10 bg-violet-200">
      <div className="flex justify-center items-center flex-col">
        <h2 className="text-5xl font-semibold bg-gradient-to-r from-[#1d0c37] to-[#a98af7] bg-clip-text text-transparent mb-4 pt-3 pb-2">Your Tasks</h2>
        <p className="text-xl text-[#c4b5fd]">See and search your created tasks</p>
      </div> 
      <nav className="flex justify-center items-center p-4 border-violet-600">
        <ul className="flex flex-col sm:flex-row text-2xl sm:text-3xl gap-4 sm:gap-8">
          <li><button>Priority</button></li>
          <li><button>Status</button></li>
          <li><button>Sort</button></li>
          <li><button>Search</button></li>
        </ul>
      </nav>
      <div className="flex justify-center items-center p-4 border-violet-600">
        {loading ? <p>Loading...</p> : tasksNode}
        {message && <p>{message}</p>}
      </div>
    </main>
  );
};

export default TasksList;
