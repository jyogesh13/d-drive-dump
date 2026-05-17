import { Bell, Shield, User } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { InfoRow } from "@/components/profile/InfoRow";
import { ProfileHeader } from "../shared/ProfileHeader";
import { InfoGrid } from "../shared/InfoGrid";

type Props = { id: string; username: string };

export const AdminProfile = ({ id, username }: Props) => (
  <>
    <ProfileHeader
      role="admin"
      name="Administrator"
      username={username}
      subtitle="System oversight and institutional management"
      stats={[
        { label: "Role",     value: "Admin"  },
        { label: "Access",   value: "Full"   },
        { label: "Controls", value: "System" },
        { label: "Status",   value: "Active" },
      ]}
    />
    <div className="grid gap-5 xl:grid-cols-3">
      <div className="xl:col-span-2">
        <SectionCard title="Account overview" icon={<Shield size={18} />}>
          <InfoGrid>
            <InfoRow label="Admin ID" value={id}       icon={<User   size={16} />} />
            <InfoRow label="Username" value={username} icon={<Shield size={16} />} />
          </InfoGrid>
        </SectionCard>
      </div>
      <div className="xl:col-span-1">
        <SectionCard title="Quick access" icon={<Bell size={18} />}>
          <div className="grid gap-3">
            {["Manage users", "Manage classes", "Manage announcements", "Manage events"].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100"
              >
                {item}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  </>
);