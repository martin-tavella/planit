"use client"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import { useTasks } from "@/context/TaskContext"
import "./styles/calendar.css"

// Mock data - reemplaza con tu contexto re
export default function CalendarPage() {
  const { tasks } = useTasks()

  const getEvents = () => {

    return tasks.filter((task) => task.deadline).map((task) => ({
        id: String(task.id),
        title: task.title,
        date: task.deadline,
        url: `/tasks?taskId=${task.id}`,
        allDay: true,
        classNames: [`priority-${task.priority}`, `status-${task.status}`],
        extendedProps: {
          priority: task.priority,
          status: task.status,
        },
      }))
  }


  const handleEventClick = (arg: any) => {
    window.open(arg.event.url, "_self")
  }


  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-br from-[#af91dc] via-[#724ca9] to-[#53209f] relative overflow-hidden pt-30">

       {/* Calendar Container */}
        <div className="max-w-7xl mx-auto mt-10 px-4">
          <div className="bg-white/100 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="p-4">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                height="auto"
                aspectRatio={1.8}
                events={getEvents()}
                eventClick={handleEventClick}
                headerToolbar={{
                  left: "prev,next today",
                  right: "title",
                }}
                dayHeaderClassNames="calendar-day-header"
                dayCellClassNames="calendar-day-cell"
                eventClassNames="calendar-event"
                dayMaxEvents={3}
                moreLinkText="more"
                eventDisplay="block"
                displayEventTime={false}
                fixedWeekCount={false}
                showNonCurrentDates={true}
              />
            </div>
          </div>
        </div>
    </main>
  )
}
