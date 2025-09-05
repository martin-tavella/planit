"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useTasks } from "@/context/TaskContext";
import { Task } from "@/types/task";

const Calendar = () => {
  const { tasks } = useTasks();

  const getEvents = (userTasks: Task[]): {title: string; date: string}[] | undefined => {
    if (!userTasks) return undefined;
    const tasksWithDeadline = userTasks.filter(task => task.deadline);
    return tasksWithDeadline.map(task => ({
      title: task.title,
      date: task.deadline as string, // assuming deadline is a string in 'YYYY-MM-DD' format
    }));
  };

  return (
    <div className="max-w-6xl mx-auto pt-30">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={getEvents(tasks)}
      />
    </div>
  );
};

export default Calendar;
