import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

type AttendanceList = {
  id: number;
  studentId: string;
  lessonId: number;
  studentName: string;
  studentSurname: string;
  lessonName: string;
  className: string;
  teacherName: string;
  teacherSurname: string;
  date: Date;
  present: boolean;
};

const AttendanceListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  const columns = [
    { header: "Student", accessor: "student" },
    { header: "Lesson", accessor: "lesson" },
    { header: "Status", accessor: "status", className: "hidden md:table-cell" },
    { header: "Class", accessor: "class", className: "hidden md:table-cell" },
    { header: "Teacher", accessor: "teacher", className: "hidden md:table-cell" },
    { header: "Date", accessor: "date", className: "hidden md:table-cell" },
    ...(role === "admin" || role === "teacher"
      ? [{ header: "Actions", accessor: "action" }]
      : []),
  ];

  const renderRow = (item: AttendanceList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-LightPurple"
    >
      <td className="p-3">{item.studentName + " " + item.studentSurname}</td>
      <td>{item.lessonName}</td>
      <td className="hidden md:table-cell">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.present
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.present ? "Present" : "Absent"}
        </span>
      </td>
      <td className="hidden md:table-cell">{item.className}</td>
      <td className="hidden md:table-cell">
        {item.teacherName + " " + item.teacherSurname}
      </td>
      <td className="hidden md:table-cell">
        {item.date.toISOString().split("T")[0]}
      </td>

      {(role === "admin" || role === "teacher") && (
        <td>
          <div className="flex items-center gap-2">
            <FormContainer table="attendance" type="update" data={item} />
            <FormContainer table="attendance" type="delete" id={item.id} />
          </div>
        </td>
      )}
    </tr>
  );

  const { page, ...queryParams } = await searchParams;
  const p = page ? parseInt(page) : 1;

  const andConditions: Prisma.AttendanceWhereInput[] = [];

  if (queryParams.studentId) {
    andConditions.push({ studentId: queryParams.studentId });
  }

  if (queryParams.lessonId) {
    andConditions.push({ lessonId: parseInt(queryParams.lessonId) });
  }

  if (queryParams.search) {
    andConditions.push({
      OR: [
        {
          student: {
            name: { contains: queryParams.search, mode: "insensitive" },
          },
        },
        {
          student: {
            surname: { contains: queryParams.search, mode: "insensitive" },
          },
        },
        {
          lesson: {
            name: { contains: queryParams.search, mode: "insensitive" },
          },
        },
      ],
    });
  }

  switch (role) {
    case "admin":
      break;
    case "teacher":
      andConditions.push({
        lesson: {
          teacherId: currentUserId!,
        },
      });
      break;
    case "student":
      andConditions.push({
        studentId: currentUserId!,
      });
      break;
    case "parent":
      andConditions.push({
        student: {
          parentId: currentUserId!,
        },
      });
      break;
    default:
      break;
  }

  const query: Prisma.AttendanceWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const [dataRes, count] = await prisma.$transaction([
    prisma.attendance.findMany({
      where: query,
      include: {
        student: {
          select: { name: true, surname: true },
        },
        lesson: {
          include: {
            class: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
          },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
      orderBy: { date: "desc" },
    }),
    prisma.attendance.count({ where: query }),
  ]);

  const data: AttendanceList[] = dataRes.map((item) => ({
    id: item.id,
    studentId: item.studentId,
    lessonId: item.lessonId,
    studentName: item.student.name,
    studentSurname: item.student.surname,
    lessonName: item.lesson.name,
    className: item.lesson.class.name,
    teacherName: item.lesson.teacher.name,
    teacherSurname: item.lesson.teacher.surname,
    date: item.date,
    present: item.present,
  }));

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      <div className="flex justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Attendance</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center justify-center">
          <TableSearch />
          <div className="flex items-center justify-center self-end gap-3">
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-Yellow">
              <Image src={"/filter.png"} alt="filter" width={14} height={14} />
            </button>
            <button className="w-8 h-8 rounded-full flex items-center justify-center bg-Yellow">
              <Image src={"/sort.png"} alt="sort" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="attendance" type="create" />
            )}
          </div>
        </div>
      </div>

      <Table columns={columns} renderRow={renderRow} data={data} />
      <Pagination page={p} count={count} />
    </div>
  );
};

export default AttendanceListPage;