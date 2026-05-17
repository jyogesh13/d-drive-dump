import { auth } from "@clerk/nextjs/server";
import FormModal from "./FormModal";
import { prisma } from "@/lib/prisma";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  if (type === "delete") return <FormModal table={table} type={type} id={id} />;

  // 1. Centralize the teacher filter logic
  const teacherFilter = role === "teacher" ? { teacherId: userId! } : {};
  const lessonTeacherFilter =
    role === "teacher" ? { lesson: { teacherId: userId! } } : {};

  // 2. Define fetchers for repeated data sets
  const getTeachers = () =>
    prisma.teacher.findMany({
      select: { id: true, name: true, surname: true },
    });
  const getClasses = () =>
    prisma.class.findMany({ select: { id: true, name: true } });
  const getLessons = () =>
    prisma.lesson.findMany({
      where: teacherFilter,
      select: { id: true, name: true },
    });

  let relatedData = {};

  // 3. Simplified Switch
  switch (table) {
    case "subject":
      relatedData = { teachers: await getTeachers() };
      break;
    case "class":
      relatedData = {
        teachers: await getTeachers(),
        grades: await prisma.grade.findMany({
          select: { id: true, level: true },
        }),
      };
      break;
    case "teacher":
      relatedData = {
        subjects: await prisma.subject.findMany({
          select: { id: true, name: true },
        }),
      };
      break;
    case "student":
      relatedData = {
        grades: await prisma.grade.findMany({
          select: { id: true, level: true },
        }),
        classes: await prisma.class.findMany({
          include: { _count: { select: { students: true } } },
        }),
      };
      break;
    case "exam":
    case "assignment":
      relatedData = { lessons: await getLessons() };
      break;
    case "lesson":
      relatedData = {
        teachers: await getTeachers(),
        classes: await getClasses(),
        subjects: await prisma.subject.findMany({
          select: { id: true, name: true },
        }),
      };
      break;
    case "result":
      relatedData = {
        students: await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        }),
        exams: await prisma.exam.findMany({
          where: lessonTeacherFilter,
          select: { id: true, title: true },
        }),
        assignments: await prisma.assignment.findMany({
          where: lessonTeacherFilter,
          select: { id: true, title: true },
        }),
      };
      break;
    case "attendance":
      relatedData = {
        students: await prisma.student.findMany({
          select: { id: true, name: true, surname: true },
        }),
        lessons: await getLessons(),
      };
      break;
    case "event":
    case "announcement":
      relatedData = { classes: await getClasses() };
      break;
  }

  return (
    <FormModal
      table={table}
      type={type}
      data={data}
      id={id}
      relatedData={relatedData}
    />
  );
};

export default FormContainer;
