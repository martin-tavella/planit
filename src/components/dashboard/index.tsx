"use client";

import Link from "next/link";
import {
  CheckSquare,
  Plus,
  Calendar,
  Settings,
  TrendingUp,
  Clock,
  Target,
  Users,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function DashboardActions() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const quickActions = [
    {
      title: "My Tasks",
      description: "View and manage your tasks",
      icon: <CheckSquare className="w-12 h-12" />,
      href: "/tasks",
      gradient: "from-[#a98af7] to-[#c4b5fd]",
      hoverGradient: "hover:from-[#9575cd] hover:to-[#b39ddb]",
    },
    {
      title: "Create Task",
      description: "Add a new task to your list",
      icon: <Plus className="w-12 h-12" />,
      href: "/tasks/create",
      gradient: "from-[#c4b5fd] to-[#e0e7ff]",
      hoverGradient: "hover:from-[#b39ddb] hover:to-[#c7d2fe]",
    },
    {
      title: "Calendar",
      description: "Schedule and view your events",
      icon: <Calendar className="w-12 h-12" />,
      href: "/calendar",
      gradient: "from-[#1d0c37] to-[#2a1548]",
      hoverGradient: "hover:from-[#2a1548] hover:to-[#3730a3]",
    },
    {
      title: "Settings",
      description: "Customize your preferences",
      icon: <Settings className="w-12 h-12" />,
      href: "/settings",
      gradient: "from-[#2a1548] to-[#a98af7]",
      hoverGradient: "hover:from-[#3730a3] hover:to-[#9575cd]",
    },
  ];

  const stats = [
    {
      label: "Tasks Completed",
      value: "18",
      icon: <Target className="w-5 h-5" />,
    },
    {
      label: "Productivity",
      value: "85%",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-full pt-30 bg-gradient-to-br from-gray-50 via-purple-50/30 to-indigo-50/20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #a98af7 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, #c4b5fd 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#a98af7]/10 rounded-full blur-xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#c4b5fd]/10 rounded-full blur-xl animate-pulse"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-24 h-24 bg-[#1d0c37]/5 rounded-full blur-lg animate-pulse"
        style={{ animationDelay: "2s" }}
      />

        {/* Welcome Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 py-8 px-30 xl:px-68 text-center">
          <div>
            <h1 className="text-5xl font-semibold bg-gradient-to-r from-[#1d0c37] to-[#a98af7] bg-clip-text text-transparent mb-4 pt-3 pb-2">
              {getGreeting()}, {user?.name || "User"}!
            </h1>
            <p className="text-xl text-[#c4b5fd]">
              Ready to organize your day?
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        {/* <div className="flex flex-row justify-center gap-20 mx-auto max-w-2/3 border-2 mr-25 border-violet-300 rounded-lg">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/50 rounded-xl p-4 text-center border border-[#a98af7]/10"
            >
              <div className="flex items-center justify-center mb-2 text-[#a98af7]">
                {stat.icon}
              </div>
              <div className="text-2xl font-bold text-[#1d0c37]">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div> */}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-3">
        {quickActions.map((action, index) => (
          <Link key={index} href={action.href}>
            <Button
              variant="ghost"
              className={`
                  w-full h-48 xl:h-70  p-8 rounded-2xl shadow-xl border-0
                  bg-gradient-to-br ${action.gradient} ${action.hoverGradient}
                  text-white transition-all duration-300 transform hover:scale-105
                  hover:shadow-2xl group relative overflow-hidden
                `}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle at 20% 80%, white 1px, transparent 1px),
                                     radial-gradient(circle at 80% 20%, white 1px, transparent 1px)`,
                    backgroundSize: "30px 30px",
                  }}
                />
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center justify-center space-y-4 h-full">
                <div className="transform group-hover:scale-110 transition-transform duration-300">
                  {action.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{action.title}</h3>
                  <p className="text-white/80 text-sm">{action.description}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
