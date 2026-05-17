export type Role = "admin" | "teacher" | "student" | "parent";

export type ContentProps = Readonly<{
  userId: string;
}>;

export const fmt = (v?: string | Date | null) =>
  v ? new Date(v).toLocaleDateString() : "-";