"use client";

import { LoginForm } from "@/components/Auth/LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary">
      <div className="max-w-xl w-full p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center mb-10">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
