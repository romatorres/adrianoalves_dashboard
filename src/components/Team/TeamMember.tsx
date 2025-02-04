"use client";

import Image from "next/image";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio?: string | null;
  instagram?: string | null;
  active: boolean;
}

interface TeamMemberProps {
  member: TeamMember;
}

const TeamMember = ({ member }: TeamMemberProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Image
        src={
          member.imageUrl.startsWith("http")
            ? member.imageUrl
            : `/uploads/team/${member.imageUrl}`
        }
        alt={member.name}
        width={400}
        height={192}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "/images/placeholder-person.jpg";
        }}
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{member.name}</h3>
        <p className="text-gray-600">{member.role}</p>
        {member.bio && <p className="text-gray-700 mt-2">{member.bio}</p>}
      </div>
    </div>
  );
};

export default TeamMember;
