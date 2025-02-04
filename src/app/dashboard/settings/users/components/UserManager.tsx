"use client";

import { useState } from "react";
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";
import { User, UserFormData } from "../types";
import { createUser, deleteUser, updateUser } from "../actions";

interface UserManagerProps {
  initialUsers: User[];
}

export function UserManager({ initialUsers }: UserManagerProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: UserFormData) => {
    setIsLoading(true);
    try {
      if (selectedUser) {
        // Atualizar usuário existente
        const updatedUser = await updateUser(selectedUser.id, data);
        setUsers(
          users.map((u) => (u.id === selectedUser.id ? updatedUser : u))
        );
      } else {
        // Criar novo usuário
        const newUser = await createUser(data);
        setUsers([...users, newUser]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving user:", error);
      alert("Erro ao salvar usuário");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedUser(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Usuários</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          Adicionar Usuário
        </button>
      </div>

      {showForm ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedUser ? "Editar Usuário" : "Novo Usuário"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          <UserForm
            user={selectedUser || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      ) : null}

      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
