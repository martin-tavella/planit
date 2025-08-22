"use client"
import { Task } from "@/types/task";
import { useState } from "react";

type FormDataType = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'status'>;

type ErrorsType = FormDataType;

const CreateTaskForm = () => {
    const [formData, setFormData] = useState<FormDataType>({
         title: "", 
         description: "",
         deadline: "",
         priority: "" as Task['priority'],
        });
    const [error, setError] = useState<ErrorsType>({} as ErrorsType);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="max-w-md mx-auto p-4 bg-violet-500 rounded shadow mt-30">
            <form>
                perrito
            </form>
        </div>
    )
}



export default CreateTaskForm;