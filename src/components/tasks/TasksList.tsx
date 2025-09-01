"use client";
import { useTasks } from "@/context/TaskContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Search, ChevronDown, Filter, SortAsc, SortDesc } from "lucide-react"

const TasksList = () => {
  const { fetchTasks, tasks, loading, error } = useTasks();
  const [priority, setPriority] = useState("any")
  const [status, setStatus] = useState("all")
  const [sortOrder, setSortOrder] = useState("desc")
  const [searchTerm, setSearchTerm] = useState("")
  const [message, setMessage] = useState<string | null>(null);


  useEffect(() => {
    if (error) {
      setMessage(error);
    }
    console.log(tasks)
  }, [error, fetchTasks, tasks]);

  const tasksNode = tasks.map((task, index) => (
    <div key={index} className="p-3 bg-white/70 rounded-lg border border-[#a98af7]/20 mb-2">
      {task.title}
    </div>
  ))

  const priorityOptions = [
    { value: "any", label: "Any Priority" },
    { value: "low", label: "Low" },
    { value: "mid", label: "Medium" },
    { value: "high", label: "High" },
  ]

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ]

  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-br from-[#af91dc] via-[#724ca9] to-[#53209f] relative overflow-hidden">
      <div className="relative z-10 pt-8 mt-30 ">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Your Tasks
          </h2>
          <p className="text-lg  text-[#c4b5fd] font-medium">See and search your created tasks</p>
        </div>

        {/* Filters Section */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-[#a98af7]/90 rounded-2xl shadow-2xl p-6">
            <div className="flex flex-wrap items-center justify-center gap-4">
              {/* Priority Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/90 border-[#a98af7]/30 text-[#1d0c37] hover:bg-[#a98af7]/10 hover:border-[#a98af7] transition-all duration-300"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Priority: {priorityOptions.find((p) => p.value === priority)?.label}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-[#a98af7]/20">
                  {priorityOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setPriority(option.value)}
                      className="hover:bg-[#a98af7]/10 focus:bg-[#a98af7]/10"
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Status Filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-white/90 border-[#a98af7]/30 text-[#1d0c37] hover:bg-[#a98af7]/10 hover:border-[#a98af7] transition-all duration-300"
                  >
                    Status: {statusOptions.find((s) => s.value === status)?.label}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white border-[#a98af7]/20">
                  {statusOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => setStatus(option.value)}
                      className="hover:bg-[#a98af7]/10 focus:bg-[#a98af7]/10"
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort Button */}
              <Button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                variant="outline"
                className="bg-white/90 border-[#a98af7]/30 text-[#1d0c37] hover:bg-[#a98af7]/10 hover:border-[#a98af7] transition-all duration-300"
              >
                {sortOrder === "asc" ? <SortAsc className="w-4 h-4 mr-2" /> : <SortDesc className="w-4 h-4 mr-2" />}
                Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
              </Button>

              {/* Search Bar */}
              <div className="relative flex-1 min-w-[250px] max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#a98af7] w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/90 border border-[#a98af7]/30 rounded-lg text-[#1d0c37] placeholder-[#1d0c37]/50 focus:outline-none focus:ring-2 focus:ring-[#a98af7]/50 focus:border-[#a98af7] transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Content */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 min-h-[400px]">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#a98af7]"></div>
                <span className="ml-3 text-[#1d0c37]">Loading...</span>
              </div>
            ) : (
              <div className="space-y-3">{tasksNode}</div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
};

export default TasksList;
