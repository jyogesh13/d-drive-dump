import { Mail, MapPin, Phone } from "lucide-react";
import { SectionCard } from "@/components/SectionCard";
import { InfoRow } from "@/components/profile/InfoRow";

export const ContactCard = ({
  email,
  phone,
  address,
}: {
  email?: string | null;
  phone?: string | null;
  address?: string | null;
}) => (
  <SectionCard title="Contact" icon={<Phone size={18} />}>
    <div className="grid gap-3">
      {email   && <InfoRow label="Email"   value={email}   icon={<Mail   size={16} />} />}
      {phone   && <InfoRow label="Phone"   value={phone}   icon={<Phone  size={16} />} />}
      {address && <InfoRow label="Address" value={address} icon={<MapPin size={16} />} />}
    </div>
  </SectionCard>
);