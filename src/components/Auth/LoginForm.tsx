"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Button from "../Ui/Button";
import Input from "../Ui/Input";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error("Erro no login:", error);
      setError("Ocorreu um erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      <div className="flex flex-col gap-5 mb-12">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Input type="email" name="email" required className="mt-1 w-full" />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Senha
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            className="mt-1 w-full"
          />
        </div>
      </div>
      <Button
        type="submit"
        variant={isLoading ? "secondary" : "primary"}
        isLoading={isLoading}
        className="w-full"
      >
        Entrar
      </Button>
    </form>
  );
}
