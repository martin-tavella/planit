"use client"
import { Task } from "@/types/task";
import { ArrowLeft, Pen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../../ui/button";
import { ErrorsType, FormDataType } from "./types";
import { useTasks } from "@/context/TaskContext";
import validateForm from "./validation";

const CreateTaskForm = () => {
    const [formData, setFormData] = useState<FormDataType>({
         title: "", 
         description: "",
         deadline: "",
         priority: "" as Task['priority'],
        });
    const [errors, setErrors] = useState<ErrorsType>({} as ErrorsType);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { createTask, error} = useTasks();
        
        const handleInputChange = (
          e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
        ) => {
            const { name, value } = e.target;
            setFormData((prev) => ({
              ...prev,
              [name]: value,
            }));
        
            if (errors[name as keyof ErrorsType]) {
              const updatedErrors = { ...errors };
              delete updatedErrors[name as keyof ErrorsType];
              setErrors(updatedErrors);
            }
          };
        
          const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setErrors((prev) => ({ ...prev, general: undefined }));
            setIsLoading(true);
            if (Object.keys(errors).length > 0) {
              setIsLoading(false);
              setErrors((prev) => ({
                ...prev,
                general: "Please fix the errors before submitting.",
              }));
              return;
            }
            setErrors({});
            await createTask({
              ...formData
            });
            if (error) {
              setIsLoading(false);
              setErrors((prev) => ({
                ...prev,
                general: error,
              }));
            } else {
              setIsLoading(false);
              setFormData({
                title: "",
                description: "",
                deadline: "",
                priority: "" as Task['priority'],
              });
              setErrors({});
            }
          };
        
          const handleBlur = (
            e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
          ) => {
            const { name } = e.target;
            const validationErrors = validateForm(formData);
            if (validationErrors[name as keyof typeof validationErrors]) {
              setErrors((prev) => ({
                ...prev,
                [name]: validationErrors[name as keyof typeof validationErrors],
              }));
            }
          };

  return (
    <main className="bg-gradient-to-br from-[#af91dc] via-[#724ca9] to-[#53209f] min-h-screen min-w-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md mt-10">
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#a98af7] hover:text-[#c4b5fd] transition-colors duration-300 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Registration Card */}
        <div className="bg-white/10 backdrop-blur-sm border border-[#a98af7]/20 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              Create Task
            </h1>
            <p className="text-[#c4b5fd] text-lg">
                Fill in the details below to create a new task.
            </p>
          </div>

         
          {/* Divider */}
              <div className="w-full border-t border-[#a98af7]/30 mb-6"></div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                <p className="text-red-400 text-sm">{errors.general}</p>
              </div>
            )}

              <div>
                <label
                  htmlFor="title"
                  className="block text-[#c4b5fd] text-sm font-medium mb-2"
                >
                  Title
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="titlte"
                    name="titlte"
                    value={formData.title}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    className={`w-full pl-4 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.title
                        ? "border-red-500 focus:ring-red-500/50"
                        : "border-[#a98af7]/30 focus:border-[#a98af7] focus:ring-[#a98af7]/50"
                    }`}
                    placeholder="My Awesome Task"
                    required
                  />
                </div>
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.title}
                  </p>
                )}
              </div>

            <div>
              <label
                htmlFor="description"
                className="block text-[#c4b5fd] text-sm font-medium mb-2"
              >
                Description
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  className={`w-full pl-4 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-200 focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                    errors.description
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-[#a98af7]/30 focus:border-[#a98af7] focus:ring-[#a98af7]/50"
                  }`}
                  placeholder="A great task description"
                />
              </div>
              {errors.description && (
                <p className="text-red-400 text-xs mt-1">{errors.description}</p>
              )}
            </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            <div>
              <label
                htmlFor="priority"
                className="block text-[#c4b5fd] text-sm font-medium mb-2"
              >
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-3 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.priority
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-[#a98af7]/30 focus:border-[#a98af7] focus:ring-[#a98af7]/50"
                }`}
                required
              >
                <option value="">Select priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              {errors.priority && (
                <p className="text-red-400 text-xs mt-1">{errors.priority}</p>
              )}
            </div>
       
            <div>
              <label
                htmlFor="deadline"
                className="block text-[#c4b5fd] text-sm font-medium mb-2"
              >
                Deadline
              </label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-3 pr-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.deadline
                    ? "border-red-500 focus:ring-red-500/50"
                    : "border-[#a98af7]/30 focus:border-[#a98af7] focus:ring-[#a98af7]/50"
                }`}
                required
              />
              {errors.deadline && (
                <p className="text-red-400 text-xs mt-1">{errors.deadline}</p>
              )}
            </div>
              </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#a98af7] to-[#c4b5fd] hover:from-[#9575cd] hover:to-[#b39ddb] text-[#1d0c37] font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#1d0c37]/30 border-t-[#1d0c37] rounded-full animate-spin"></div>
                  Creating Task...
                </div>
              ) : (
                "Create Task"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}



export default CreateTaskForm;