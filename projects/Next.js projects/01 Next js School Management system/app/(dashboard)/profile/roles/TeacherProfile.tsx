import { BookOpen, CalendarDays, Droplets, School, Shield, User } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { InfoRow } from "@/components/profile/InfoRow";
import { ProfileHeader } from "../shared/ProfileHeader";
import { InfoGrid } from "../shared/InfoGrid";
import { TagList } from "../shared/TagList";
import { ContactCard } from "../shared/ContactCard";
import { fmt } from "../types";

type Subject = { id: number; name: string };
type Class   = { id: number; name: string };
type Lesson  = { id: number; name: string; startTime: Date };

type Props = {
  name: string; surname: string; username: string; img?: string | null;
  gender: string; bloodType: string; birthday: Date; createdAt: Date;
  email?: string | null; phone?: string | null; address?: string | null;
  subjects: Subject[]; classes: Class[]; lessons: Lesson[];
};

export const TeacherProfile = ({
  name, surname, username, img, gender, bloodType, birthday, createdAt,
  email, phone, address, subjects, classes, lessons,
}: Props) => (
  <>
    <ProfileHeader
      role="teacher"
      name={`${name} ${surname}`}
      username={username}
      image={img}
      subtitle={`${subjects.length} subject(s) assigned`}
      stats={[
        { label: "Subjects", value: subjects.length },
        { label: "Classes",  value: classes.length  },
        { label: "Lessons",  value: lessons.length  },
        { label: "Role",     value: "Teacher"       },
      ]}
    />
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <SectionCard title="Personal details" icon={<User size={18} />}>
          <InfoGrid>
            <InfoRow label="Full name"  value={`${name} ${surname}`} icon={<User         size={16} />} />
            <InfoRow label="Username"   value={username}             icon={<Shield        size={16} />} />
            <InfoRow label="Gender"     value={gender}               icon={<User         size={16} />} />
            <InfoRow label="Blood type" value={bloodType}            icon={<Droplets     size={16} />} />
            <InfoRow label="Birthday"   value={fmt(birthday)}        icon={<CalendarDays size={16} />} />
            <InfoRow label="Joined"     value={fmt(createdAt)}       icon={<CalendarDays size={16} />} />
          </InfoGrid>
        </SectionCard>

        <SectionCard title="Teaching overview" icon={<BookOpen size={18} />}>
          <div className="grid gap-4 md:grid-cols-2">
            {([["Subjects", subjects], ["Classes", classes]] as const).map(([label, items]) => (
              <div key={label} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                <p className="mb-3 text-sm font-semibold text-zinc-800">{label}</p>
                <TagList items={items} emptyLabel={`No ${label.toLowerCase()} assigned`} />
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="space-y-5 lg:col-span-1">
        <ContactCard email={email} phone={phone} address={address} />
        <SectionCard title="Upcoming lessons" icon={<School size={18} />}>
          <div className="space-y-3">
            {lessons.length ? (
              lessons.map((l) => (
                <div key={l.id} className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
                  <p className="text-sm font-medium text-zinc-800">{l.name}</p>
                  <p className="mt-1 text-xs text-zinc-500">{fmt(l.startTime)}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-zinc-500">No upcoming lessons</p>
            )}
          </div>
        </SectionCard>
      </div>
    </div>
  </>
);