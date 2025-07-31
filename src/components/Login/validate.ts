import { FormData } from "./types/FormData";
import { FormErrors } from "./types/FormErrors";

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};
  const { email, password } = formData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.trim() === "") {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }

  if (password.trim() === "") {
    errors.password = "Password is required";
  }

  return errors;
};
