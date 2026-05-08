import { z } from "zod";

export const loginSchema = z.object({
  userNameOrEmail: z.string().min(1, "Email or Username is required"),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().min(1, "First Name is required").max(50, "Max 50 characters"),
  lastName: z.string().min(1, "Last Name is required").max(50, "Max 50 characters"),
  email: z.string().email("Invalid email address"),
  userName: z.string().min(3, "Username must be at least 3 characters").max(30, "Max 30 characters"),
  phoneNumber: z.string().min(10, "Invalid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Confirm Password is required"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type RegisterSchema = z.infer<typeof registerSchema>;
