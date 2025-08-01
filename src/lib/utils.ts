import { clsx, type ClassValue } from "clsx"
import { jwtDecode } from "jwt-decode"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface JwtPayload {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

export const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token)
  } catch (error) {
    console.error("Failed to decode token:", error)
    return null
  }
}