"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Camera,
  User,
  Mail,
  LogOut,
  Edit3,
  Save,
  X,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { updatePictureService } from "@/services/user.service";
import { useTasks } from "@/context/TaskContext";

const ProfileView = () => {
  const { user, login, logout } = useAuth();
  const { tasks, totalTasks, completedTasks } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [profileImage, setProfileImage] = useState(
    user?.picture || "/placeholder.svg?height=120&width=120"
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setProfileImage(user?.picture);
    }
  }, [user, isUploadingPhoto]);

  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) setIsUploadingPhoto(true);
    const formData = new FormData();
    formData.append("image", file!);
    const token = await updatePictureService(formData);
    login(token);
    setIsUploadingPhoto(false);

  };

  const handleLogout = () => {
    logout()
  };

  return (
    <main className="min-h-screen min-w-screen bg-gradient-to-br from-[#af91dc] via-[#724ca9] to-[#53209f] relative overflow-hidden">
      <div className="relative z-10 pt-40">
        {/* Profile Card */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#1d0c37] to-[#2a1548] p-8 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#a98af7]/10 to-[#c4b5fd]/10" />

              <div className="relative flex flex-col items-center">
                {/* Profile Picture */}
                <div className="relative group mb-6">
                  <div className="w-32 h-32 rounded-full border-4 border-white/20 overflow-hidden bg-white/10 flex items-center justify-center">
                    {profileImage &&
                    profileImage !== "/placeholder.svg?height=120&width=120" ? (
                      <Image
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        width={120}
                        height={120}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-16 h-16 text-white/70" />
                    )}

                    {/* Upload Overlay */}
                    {isUploadingPhoto && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                      </div>
                    )}
                  </div>

                  {/* Camera Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingPhoto}
                    className="absolute bottom-2 right-2 bg-[#a98af7] hover:bg-[#9575cd] text-white p-2 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 disabled:opacity-50"
                  >
                    {isUploadingPhoto ? (
                      <Upload className="w-4 h-4" />
                    ) : (
                      <Camera className="w-4 h-4" />
                    )}
                  </button>

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                {/* User Name */}
                <div className="text-center">
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className="text-2xl font-bold text-white bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-center focus:outline-none focus:ring-2 focus:ring-[#a98af7]/50"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <h2 className="text-2xl font-bold text-white mb-2">
                      {user?.name || "User Name"}
                    </h2>
                  )}
                  <p className="text-white/70">Planit User</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-6 bg-white">
              {/* Email Section */}
              <div className="bg-gradient-to-r from-[#a98af7]/10 to-[#p4b5fd]/10 rounded-xl p-6 border border-[#a98af7]/20">
                <div className="flex items-center space-x-4">
                  <div className="bg-[#a98af7] p-3 rounded-full">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[#1d0c37] mb-1">
                      Email Address
                    </h3>
                    <p className="text-gray-600">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#c4b5fd]/10 to-[#a98af7]/10 rounded-xl p-6 border border-[#a98af7]/20">
                <h3 className="text-lg font-semibold text-[#1d0c37] mb-4">
                  Account Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Tasks created:</span>
                    <p className="font-medium text-[#1d0c37]">{totalTasks} tasks</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Tasks completed:</span>
                    <p className="font-medium text-[#1d0c37]">{completedTasks} tasks</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-4">

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 bg-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileView;
