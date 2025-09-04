import { FormErrors } from "@/components/Login/types/FormErrors";
import { ErrorsType, FormDataType } from "./types";

const validateForm = (formData: FormDataType): ErrorsType => {
    const errors: ErrorsType = {};
    const { title, description, priority, deadline } = formData;
    
    if (title.trim() === "") {
        errors.title = "Title is required";
    } else if (title.length < 3) {
        errors.title = "Title must be at least 3 characters long";
    } else if (title.length > 50) {
        errors.title = "Title must not exceed 100 characters";
    }

    if (description && description.length < 10) {
        errors.description = "Description must be at least 10 characters long";
    }  else if (description && description.length > 500) {
        errors.description = "Description must not exceed 500 characters";
    }

    if (!priority) {
        errors.priority = "Priority is required";
    } else if (!["low", "medium", "high"].includes(priority)) {
        errors.priority = "Priority must be low, medium, or high";
    }

    if (deadline) {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        if (isNaN(deadlineDate.getTime())) {
            errors.deadline = "Invalid date format";
        } else if (deadlineDate < today) {
            errors.deadline = "Deadline cannot be in the past";
        }
    }

    return errors;
}

export default validateForm;