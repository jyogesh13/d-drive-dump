import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import StudentAttendanceCard from "@/components/StudentAttendanceCard";
import { Class, Student } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: { id: string };
};

const SingleStudentPage = async ({ params }: Props) => {
  const { id } = await params;
  const student:
    | (Student & { class: Class & { _count: { lessons: number } } })
    | null = await prisma.student.findUnique({
    where: { id },
    include: {
      class: { include: { _count: { select: { lessons: true } } } },
    },
  });
  if (!student) {
    notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* user info card */}
          <div className="bg-SkyColor py-6 px-4 rounded-2xl flex-2  flex gap-3 shadow-md">
            {/* profile img */}
            <div className="w-1/3">
              <Image
                src={student.img || "/noAvatar.png"}
                alt="teacher-photo"
                width={144}
                height={144}
                className="w-25 h-25 sm:w-30 sm:h-30 md:w-36 md:h-36 xl:w-33 xl:h-33 rounded-full object-cover"
              />
            </div>
            {/* teacher info */}
            <div className="w-2/3 flex flex-col justify-between gap-2 md:gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">
                  {student.name + " " + student.surname}
                </h1>
                <FormContainer table="student" type="update" data={student} />
              </div>
              <p className="text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium ">
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex  items-center gap-2">
                  <Image
                    src={"/blood.png"}
                    alt="bloodGrp"
                    width={14}
                    height={14}
                  />
                  <span>{student.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex  items-center gap-2">
                  <Image src={"/date.png"} alt="bday" width={14} height={14} />
                  <span>{student.birthday.toISOString().split("T")[0]}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex  items-center gap-2 hover:overflow-visible">
                  <Image src={"/mail.png"} alt="email" width={14} height={14} />
                  <span>{student.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex  items-center gap-2">
                  <Image
                    src={"/phone.png"}
                    alt="phone"
                    width={14}
                    height={14}
                  />
                  <span>{student.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* small cards */}
          <div className="grid grid-cols-2 gap-2 items-center">
            {/* card */}
            <div className="bg-white w-full md:w-[48%] lg:w-full flex gap-4 rounded-2xl p-3 shadow-md">
              <Image
                src={"/singleAttendance.png"}
                alt="singleAttendance"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <Suspense fallback="loading...">
                <StudentAttendanceCard id={student.id} />
              </Suspense>
            </div>
            <div className="bg-white w-full md:w-[48%] lg:w-full flex gap-4 rounded-2xl p-3 shadow-md">
              <Image
                src={"/singleBranch.png"}
                alt="singleBranch"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {student.class.name.charAt(0)}
                </h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>
            <div className="bg-white w-full md:w-[48%] lg:w-full flex gap-4 rounded-2xl p-3 shadow-md">
              <Image
                src={"/singleLesson.png"}
                alt="singleLesson"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {student.class._count.lessons}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white w-full md:w-[48%] lg:w-full flex gap-4 rounded-2xl p-3 shadow-md">
              <Image
                src={"/singleClass.png"}
                alt="singleClass"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{student.class.name}</h1>
                <span className="text-sm text-gray-400">Class</span>
              </div>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="mt-4 bg-white rounded-2xl p-4 h-230 shadow-md">
          {/* teacher schedule */}
          <h1 className="">Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type="classId" id={student.class.id} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* teachers shortcuts */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500 ">
            <Link
              href={`/list/lessons?classId=${student.class.id}`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl bg-LightPurple"
            >
              Student&apos;s Lessons
            </Link>
            <Link
              href={`/list/teachers?classId=${student.class.id}`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl  bg-LightSky"
            >
              Student&apos;s Teachers
            </Link>
            <Link
              href={`/list/exams?classId=${student.class.id}`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl bg-red-100"
            >
              Student&apos;s Exams
            </Link>
            <Link
              href={`/list/assignments?classId=${student.class.id}`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl bg-pink-100"
            >
              Student&apos;s Assignments
            </Link>
            <Link
              href={`/list/results?studentId=${student.id}`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl bg-pink-100"
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
