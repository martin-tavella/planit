import { FormData } from "./types/FormData";
import { FormErrors } from "./types/FormErrors";

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};
  const { firstName, lastName, email, password, confirmPassword } = formData;
  const firstNameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/; // Allow letters and spaces, at least 2 characters
  const lastNameRegex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = {
    hasUpperCase: /[A-Z]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  if (firstName.trim() === "") {
    errors.firstName = "First name is required";
  } else if (!firstNameRegex.test(firstName)) {
    errors.firstName = "First name must contain only letters and spaces";
  } else if (firstName.length < 2) {
    errors.firstName = "First name must be at least 2 characters long";
  }

  if (lastName.trim() === "") {
    errors.lastName = "Last name is required";
  } else if (!lastNameRegex.test(lastName)) {
    errors.lastName = "Last name must contain only letters and spaces";
  } else if (lastName.length < 2) {
    errors.lastName = "Last name must be at least 2 characters long";
  }

  if (email.trim() === "") {
    errors.email = "Email is required";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format";
  }

  if (password.trim() === "") {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long";
  } else if (!passwordRegex.hasUpperCase.test(password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (password.length > 20) {
    errors.password = "Password must not exceed 20 characters";
  } else if (!passwordRegex.hasSpecialChar.test(password)) {
    errors.password = "Password must contain at least one special character";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  
  return errors;
};
