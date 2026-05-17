import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

const Announcements = async () => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;

  const roleCondition = {
    teacher: { lessons: { some: { teacherId: userId! } } },
    student: { students: { some: { id: userId! } } },
    parent: { students: { some: { parentId: userId! } } },
  };
  const data = await prisma.announcement.findMany({
    where: {
      ...(role !== "admin" && {
        OR: [
          { classId: null },
          { class: roleCondition[role as keyof typeof roleCondition] || {} },
        ],
      }),
    },
    take: 3,
    orderBy: { date: "desc" },
  });
  return (
    <div className="bg-white px-4 py-2 pb-2 shadow-md rounded-2xl">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Announcements</span>
        <span className="text-xs text-gray-400 cursor-pointer">view all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {/* first */}
        {data[0] && (
          <div className="bg-LightSky rounded-md px-4 py-2">
            <div className="flex items-center justify-between">
              <h1 className="font-medium">{data[0].title}</h1>
              <span className="text-gray-400 text-xs bg-white rounded-md p-1">
                {data[0].date.toLocaleDateString("en-In")}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{data[0].description}</p>
          </div>
        )}
        {/* second */}
        {data[1] && (
          <div className="bg-LightPurple rounded-md px-4 py-2">
            <div className="flex items-center justify-between">
              <h1 className="font-medium">{data[1].title}</h1>
              <span className="text-gray-400 text-xs bg-white rounded-md p-1">
                {data[1].date.toLocaleDateString("en-In")}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{data[1].description}</p>
          </div>
        )}
        {/* third */}
        {data[2] && (
          <div className="bg-LightYellow rounded-md px-4 py-2">
            <div className="flex items-center justify-between">
              <h1 className="font-medium">{data[2].title}</h1>
              <span className="text-gray-400 text-xs bg-white rounded-md p-1">
                {data[2].date.toLocaleDateString("en-In")}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
