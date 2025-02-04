"use client";

// Mover todo o código client (estados, handlers) para este componente
import { useState } from "react";
import { TeamForm } from "./TeamForm";
import { TeamList } from "./TeamList";
import { TeamMember, TeamMemberFormData } from "../types";
import {
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
} from "../actions";

interface TeamManagerProps {
  initialMembers: TeamMember[];
}

export function TeamManager({ initialMembers }: TeamManagerProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data: TeamMemberFormData) => {
    setIsLoading(true);
    try {
      if (selectedMember) {
        const updatedMember = await updateTeamMember(selectedMember.id, data);
        setMembers(
          members.map((m) => (m.id === selectedMember.id ? updatedMember : m))
        );
      } else {
        const newMember = await createTeamMember(data);
        setMembers([...members, newMember]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error saving team member:", error);
      alert("Erro ao salvar membro da equipe");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteTeamMember(id);
      setMembers(members.filter((m) => m.id !== id));
    } catch (error) {
      console.error("Error deleting team member:", error);
      throw error;
    }
  };

  const handleCloseForm = () => {
    setSelectedMember(null);
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Equipe</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
        >
          Adicionar Membro
        </button>
      </div>

      {showForm ? (
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {selectedMember ? "Editar Membro" : "Novo Membro"}
            </h2>
            <button
              onClick={handleCloseForm}
              className="text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
          </div>
          <TeamForm
            member={selectedMember || undefined}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      ) : null}

      <TeamList members={members} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
