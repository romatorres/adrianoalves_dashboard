// Funções de ação para gerenciar equipe (create, update, delete)
import { TeamMember } from "./types";

export async function createTeamMember(data: Omit<TeamMember, "id">) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create team member');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating team member:', error);
    throw error;
  }
}

export async function updateTeamMember(id: string, data: Partial<TeamMember>) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update team member');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating team member:', error);
    throw error;
  }
}

export async function deleteTeamMember(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete team member');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw error;
  }
}

export async function getTeamMember(id: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/team/${id}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch team member');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching team member:', error);
    throw error;
  }
} 