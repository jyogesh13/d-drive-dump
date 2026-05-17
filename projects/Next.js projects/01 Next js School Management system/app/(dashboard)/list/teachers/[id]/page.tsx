import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import FormContainer from "@/components/FormContainer";
import Performance from "@/components/Performance";
import { Teacher } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

const SingleTeacherPage = async ({ params }: Props) => {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const { id } = await params;
  const teacher:
    | (Teacher & {
        _count: { subjects: number; lessons: number; classes: number };
      })
    | null = await prisma.teacher.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          subjects: true,
          classes: true,
          lessons: true,
        },
      },
    },
  });
  if (!teacher) {
    notFound();
  }
  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* left */}
      <div className="w-full xl:w-2/3">
        {/* top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* user info card */}
          <div className="bg-SkyColor py-6 px-4 rounded-2xl flex-1 flex gap-3 shadow-md">
            {/* profile img */}
            <div className="w-1/3">
              <Image
                src={teacher?.img || "/noAvatar.png"}
                alt="teacher-photo"
                width={144}
                height={144}
                className="w-25 h-25 sm:w-30 sm:h-30 md:w-36 md:h-36 xl:w-33 xl:h-33 rounded-full object-cover"
              />
            </div>
            {/* teacher info */}
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold">
                  {teacher.name + " " + teacher.surname}
                </h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={teacher} />
                )}
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
                  <span>{teacher.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex  items-center gap-2">
                  <Image src={"/date.png"} alt="bday" width={14} height={14} />
                  <span>{teacher.birthday.toLocaleDateString()}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex  items-center gap-2">
                  <Image src={"/mail.png"} alt="email" width={14} height={14} />
                  <span>{teacher?.email || "-"}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full xl:w-[48%] flex  items-center gap-2">
                  <Image
                    src={"/phone.png"}
                    alt="phone"
                    width={14}
                    height={14}
                  />
                  <span>{teacher.phone || "-"}</span>
                </div>
              </div>
            </div>
          </div>
          {/* small cards */}
          <div className="flex-1 flex gap-4 flex-wrap justify-between">
            {/* card */}
            <div className="bg-white w-full md:w-[48%] lg:w-[45%] flex gap-4 rounded-2xl p-3 shadow-md">
              <Image
                src={"/singleAttendance.png"}
                alt="singleAttendance"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            <div className="bg-white w-full md:w-[48%] lg:w-[45%] flex gap-4 rounded-2xl p-3 shadow-md">
              <Image
                src={"/singleBranch.png"}
                alt="singleBranch"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.subjects}
                </h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            <div className="bg-white w-full md:w-[48%] lg:w-[45%] flex gap-4 rounded-2xl p-3 shadow-md">
              <Image
                src={"/singleLesson.png"}
                alt="singleLesson"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.lessons}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            <div className="bg-white w-full md:w-[48%] lg:w-[45%] flex gap-4 rounded-2xl p-3 shadow-md">
              <Image
                src={"/singleClass.png"}
                alt="singleClass"
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {teacher._count.classes}
                </h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="mt-4 bg-white rounded-2xl p-4 h-230 shadow-md">
          {/* teacher schedule */}
          <h1 className="">Teacher&apos;s Schedule</h1>
          <BigCalendarContainer type="teacherId" id={teacher.id} />
        </div>
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        {/* teachers shortcuts */}
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500 ">
            <Link
              href={`/list/classes?supervisorId=${teacher.id}`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl bg-LightPurple"
            >
              Teacher&apos;s Classes
            </Link>
            <Link
              href={`/list/students?teacherId=${teacher.id}`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl  bg-LightSky"
            >
              Teacher&apos;s Students
            </Link>
            <Link
              href={`/list/lessons?teacherId=${teacher.id}`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl bg-LightYellow"
            >
              Teacher&apos;s Lessons
            </Link>
            <Link
              href={`/list/exams?teacherId="teacher2"`}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl bg-red-100"
            >
              Teacher&apos;s Exams
            </Link>
            <Link
              href={"/"}
              className="px-2 py-3 shadow-md hover:shadow-SkyColor hover:shadow-inner rounded-xl bg-pink-100"
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <div className="">
          <Performance />
        </div>
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
