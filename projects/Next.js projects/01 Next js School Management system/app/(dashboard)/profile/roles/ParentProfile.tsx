import { CalendarDays, GraduationCap, Shield, User, Users } from "lucide-react";
import Image from "next/image";
import { SectionCard } from "@/components/SectionCard";
import { InfoRow } from "@/components/profile/InfoRow";
import { ProfileHeader } from "../shared/ProfileHeader";
import { ContactCard } from "../shared/ContactCard";
import { fmt } from "../types";

type LinkedStudent = {
  id: string; name: string; surname: string; img?: string | null;
  class?: { name: string } | null;
  grade?: { level: number } | null;
};

type Props = {
  name: string; surname: string; username: string;
  email?: string | null; phone?: string | null; address?: string | null;
  createdAt: Date; students: LinkedStudent[];
};

export const ParentProfile = ({
  name, surname, username, email, phone, address, createdAt, students,
}: Props) => (
  <>
    <ProfileHeader
      role="parent"
      name={`${name} ${surname}`}
      username={username}
      subtitle={`${students.length} linked student(s)`}
      stats={[
        { label: "Children", value: students.length },
        { label: "Role",     value: "Parent"        },
        { label: "Contact",  value: phone ?? "-"    },
        { label: "Status",   value: "Active"        },
      ]}
    />
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-1">
        <SectionCard title="Parent profile" icon={<Users size={18} />}>
          <div className="grid gap-3">
            <InfoRow label="Full name" value={`${name} ${surname}`} icon={<User         size={16} />} />
            <InfoRow label="Username"  value={username}             icon={<Shield        size={16} />} />
            <InfoRow label="Joined"    value={fmt(createdAt)}       icon={<CalendarDays size={16} />} />
          </div>
        </SectionCard>
        <ContactCard email={email} phone={phone} address={address} />
      </div>

      <div className="space-y-5 lg:col-span-2">
        <SectionCard title="Linked students" icon={<GraduationCap size={18} />}>
          <div className="grid gap-4 md:grid-cols-2">
            {students.length ? (
              students.map((s) => (
                <div
                  key={s.id}
                  className="rounded-3xl border border-zinc-100 bg-zinc-50 p-4 transition hover:border-zinc-200 hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-zinc-200 text-sm font-semibold text-zinc-600">
                      {s.img ? (
                        <Image src={s.img} alt={s.name} width={48} height={48} className="h-12 w-12 object-cover" />
                      ) : (
                        `${s.name[0]}${s.surname[0]}`.toUpperCase()
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">{s.name} {s.surname}</p>
                      <p className="text-xs text-zinc-500">
                        {s.class?.name ?? "No class"} • Grade {s.grade?.level ?? "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No linked students</p>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  </>
);