"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import { useTasks } from "@/context/TaskContext";
import { Task } from "@/types/task";
import tooltipUtils from "./utils/tooltip";

const Calendar = () => {
  const { tasks } = useTasks();

  const getEvents = (
    userTasks: Task[]
  ): { title: string; date: string }[] | undefined => {
    if (!userTasks) return undefined;
    const tasksWithDeadline = userTasks.filter((task) => task.deadline);
    return tasksWithDeadline.map((task) => ({
      title: task.title,
      date: task.deadline as string,
      url: `/tasks?taskId=${task.id}`,
      allDay: true,
      backgroundColor:
        task.priority === "high"
          ? "#fee2e3"
          : task.priority === "medium"
          ? "#fff8c2"
          : "#dbfde6",
       textColor: 
        task.priority === "high"
          ? "#b91c1c"
          : task.priority === "medium"
          ? "#a16207"
          : "#166534",
      borderColor:
        task.priority === "high"
          ? "#fecaca" : task.priority === "medium"
          ? "#fde68a"
          : "#86efac",
    }));
  };

  const handleEventHover = (arg) => {
    const { tooltip, moveTooltip } = tooltipUtils;
    tooltip.innerHTML = arg.event.title;
    document.body.appendChild(tooltip);
    document.addEventListener("mousemove", moveTooltip);
  };

  const handleEventLeave = (arg) => {
    const tooltip = document.getElementById("tooltip");
    if (tooltip) {
      document.body.removeChild(tooltip);
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-30">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={getEvents(tasks)}
        eventMouseEnter={handleEventHover}
        eventMouseLeave={handleEventLeave}
      />
    </div>
  );
};

export default Calendar;
