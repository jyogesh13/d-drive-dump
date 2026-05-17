import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const ParentPage = async () => {
  const { userId } = await auth();

  const students = await prisma.student.findMany({
    where: {
      parentId: userId!,
    },
  });
  return (
    <div className="flex-1 p-4 h-screen flex gap-4 flex-col xl:flex-row">
      {/* left */}
      <div className="flex-1 flex flex-col gap-5">
        {students.map((student) => (
          <div key={student.id} className="w-full">
            <div className="h-full w-full md:h-230 bg-white p-4 rounded-md">
              <h1 className="text-xl font-semibold">
                Schedule ({student.name + " " + student.surname})
              </h1>
              <BigCalendarContainer type="classId" id={student.classId} />
            </div>
          </div>
        ))}
      </div>
      {/* right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8  ">
        <Announcements />
      </div>
    </div>
  );
};

export default ParentPage;
