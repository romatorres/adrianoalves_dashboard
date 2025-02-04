"use client";

import TeamMember, { TeamMember as TeamMemberType } from "./TeamMember";
/* import Link from "next/link";
import { useSession } from "next-auth/react";
 */
interface TeamGridProps {
  members: TeamMemberType[];
}

const TeamGrid = ({ members }: TeamGridProps) => {
  /* const { data: session } = useSession();
  const isAdmin = session?.user?.role === "ADMIN"; */

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Nossa Equipe</h2>
          {/* {isAdmin && (
            <Link
              href="/admin/team/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Adicionar Membroooss
            </Link>
          )} */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members
            .filter((member) => member.active)
            .map((member) => (
              <TeamMember key={member.id} member={member} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TeamGrid;
