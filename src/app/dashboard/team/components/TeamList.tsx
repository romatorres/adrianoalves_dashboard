"use client";

import { TeamMember } from "../types";
import Image from "next/image";
import { useState } from "react";

interface TeamListProps {
  members: TeamMember[];
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => Promise<void>;
}

export function TeamList({ members = [], onEdit, onDelete }: TeamListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir este membro?")) {
      setDeletingId(id);
      try {
        await onDelete(id);
      } catch (error) {
        console.error("Error deleting member:", error);
        alert("Erro ao excluir membro");
      } finally {
        setDeletingId(null);
      }
    }
  };

  if (!members || members.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhum membro encontrado
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="relative h-40 w-full mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                {member.name}
              </h3>
              <p className="text-sm text-gray-500">{member.role}</p>
              {member.bio && (
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {member.bio}
                </p>
              )}
              {member.instagram && (
                <a
                  href={`https://instagram.com/${member.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-sm text-amber-600 hover:text-amber-700"
                >
                  @{member.instagram}
                </a>
              )}
              <div className="mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    member.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {member.active ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => onEdit(member)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(member.id)}
              disabled={deletingId === member.id}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              {deletingId === member.id ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
