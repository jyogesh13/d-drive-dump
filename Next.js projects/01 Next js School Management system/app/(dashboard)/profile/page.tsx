import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import type { ContentProps, Role } from "./types";
import { AdminProfile } from "./roles/AdminProfile";
import { TeacherProfile } from "./roles/TeacherProfile";
import { StudentProfile } from "./roles/StudentProfile";
import { ParentProfile } from "./roles/ParentProfile";



async function AdminContent({userId}:ContentProps) {
  const admin = await prisma.admin.findUnique({ where: { id: userId } });
  if (!admin) redirect("/");
  return <AdminProfile id={admin.id} username={admin.username} />;
}

async function TeacherContent({userId}: ContentProps) {
  const teacher = await prisma.teacher.findUnique({
    where: { id: userId },
    include: {
      subjects: { select: { id: true, name: true } },
      classes: { select: { id: true, name: true } },
      lessons: {
        select: { id: true, name: true, startTime: true },
        orderBy: { startTime: "asc" },
        take: 4,
      },
    },
  });
  if (!teacher) redirect("/");
  return <TeacherProfile {...teacher} />;
}

async function StudentContent({userId}: ContentProps) {
  const student = await prisma.student.findUnique({
    where: { id: userId },
    include: {
      parent: {
        select: { id: true, name: true, surname: true, phone: true },
      },
      class: { select: { id: true, name: true } },
      grade: { select: { id: true, level: true } },
      attendances: { select: { id: true } },
      results: { select: { id: true, score: true } },
    },
  });
  if (!student) redirect("/");
  return (
    <StudentProfile
      {...student}
      className={student.class.name}
      gradeLevel={student.grade.level}
      attendanceCount={student.attendances.length}
      resultCount={student.results.length}
      parentName={student.parent.name}
      parentSurname={student.parent.surname}
      parentPhone={student.parent.phone}
    />
  );
}

async function ParentContent({userId}: ContentProps) {
  const parent = await prisma.parent.findUnique({
    where: { id: userId },
    include: {
      students: {
        include: {
          class: { select: { name: true } },
          grade: { select: { level: true } },
        },
      },
    },
  });
  if (!parent) redirect("/");
  return <ParentProfile {...parent} />;
}

export default async function ProfilePage() {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");

  const role = (sessionClaims?.metadata as { role?: Role })?.role;
  if (!role) redirect("/");

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {role === "admin" && <AdminContent userId={userId} />}
          {role === "teacher" && <TeacherContent userId={userId} />}
          {role === "student" && <StudentContent userId={userId} />}
          {role === "parent" && <ParentContent userId={userId} />}
        </div>
      </div>
    </div>
  );
}
