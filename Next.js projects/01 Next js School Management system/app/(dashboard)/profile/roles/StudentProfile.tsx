import {
  BookOpen, CalendarDays, ClipboardList, Droplets,
  GraduationCap, Phone, Shield, User, Users,
} from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { InfoRow } from "@/components/profile/InfoRow";
import { ProfileHeader } from "../shared/ProfileHeader";
import { InfoGrid } from "../shared/InfoGrid";
import { ContactCard } from "../shared/ContactCard";
import { fmt } from "../types";

type Props = {
  name: string; surname: string; username: string; img?: string | null;
  gender: string; bloodType: string; birthday: Date; createdAt: Date;
  email?: string | null; phone?: string | null; address?: string | null;
  className: string; gradeLevel: number;
  attendanceCount: number; resultCount: number;
  parentName: string; parentSurname: string; parentPhone?: string | null;
};

export const StudentProfile = ({
  name, surname, username, img, gender, bloodType, birthday, createdAt,
  email, phone, address, className, gradeLevel, attendanceCount, resultCount,
  parentName, parentSurname, parentPhone,
}: Props) => (
  <>
    <ProfileHeader
      role="student"
      name={`${name} ${surname}`}
      username={username}
      image={img}
      subtitle={`${className} • Grade ${gradeLevel}`}
      stats={[
        { label: "Attendance", value: attendanceCount },
        { label: "Results",    value: resultCount     },
        { label: "Class",      value: className       },
        { label: "Role",       value: "Student"       },
      ]}
    />
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <SectionCard title="Student information" icon={<GraduationCap size={18} />}>
          <InfoGrid>
            <InfoRow label="Full name"  value={`${name} ${surname}`} icon={<User         size={16} />} />
            <InfoRow label="Username"   value={username}             icon={<Shield        size={16} />} />
            <InfoRow label="Gender"     value={gender}               icon={<User         size={16} />} />
            <InfoRow label="Blood type" value={bloodType}            icon={<Droplets     size={16} />} />
            <InfoRow label="Birthday"   value={fmt(birthday)}        icon={<CalendarDays size={16} />} />
            <InfoRow label="Joined"     value={fmt(createdAt)}       icon={<CalendarDays size={16} />} />
          </InfoGrid>
        </SectionCard>

        <SectionCard title="Academic details" icon={<ClipboardList size={18} />}>
          <InfoGrid>
            <InfoRow label="Class"              value={className}              icon={<School        size={16} />} />
            <InfoRow label="Grade"              value={`Grade ${gradeLevel}`}  icon={<GraduationCap size={16} />} />
            <InfoRow label="Attendance records" value={attendanceCount}        icon={<ClipboardList  size={16} />} />
            <InfoRow label="Results"            value={resultCount}            icon={<BookOpen       size={16} />} />
          </InfoGrid>
        </SectionCard>
      </div>

      <div className="space-y-5 lg:col-span-1">
        <ContactCard email={email} phone={phone} address={address} />
        <SectionCard title="Parent details" icon={<Users size={18} />}>
          <div className="grid gap-3">
            <InfoRow label="Parent"       value={`${parentName} ${parentSurname}`} icon={<Users size={16} />} />
            <InfoRow label="Parent phone" value={parentPhone}                       icon={<Phone size={16} />} />
          </div>
        </SectionCard>
      </div>
    </div>
  </>
);