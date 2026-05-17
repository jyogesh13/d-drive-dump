import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";

const Navbar = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role;

  const andConditions: Prisma.AnnouncementWhereInput[] = [];

  // ROLE CONDITIONS
  const roleConditions = {
    teacher: {
      OR: [
        { lessons: { some: { teacherId: user?.id } } },
        { supervisorId: user?.id },
      ],
    },
    student: { students: { some: { id: user?.id } } },
    parent: { students: { some: { parentId: user?.id } } },
  };

  if (role === "teacher" || role === "student" || role === "parent") {
    andConditions.push({
      OR: [
        { classId: null },
        {
          class: roleConditions[role],
        },
      ],
    });
  }

  andConditions.push({
    reads: {
      none: {
        userId: user?.id,
      },
    },
  });

  const query: Prisma.AnnouncementWhereInput = andConditions.length
    ? { AND: andConditions }
    : {};
  const announcements = await prisma.announcement.count({ where: query });

  return (
    <div className="flex items-center justify-between p-4">
      {/* search bar */}
      <div className="hidden md:flex gap-1 border border-gray-300 shadow bg-white/30 rounded-4xl px-2 py-1">
        <div className="flex justify-center items-center w-7 h-7">
          <Image src={"/search.png"} alt="search" width={17} height={17} />
        </div>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="outline-0"
        />
      </div>
      {/* right side icons and user*/}
      <div className="flex gap-6 items-center justify-end w-full">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer ">
          <Image src={"/message.png"} alt="message" width={20} height={20} />
        </div>
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer relative">
          <Image
            src={"/announcement.png"}
            alt="message"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center rounded-full bg-purple-500 text-white">
            {announcements}
          </div>
        </div>
        <div className="flex flex-col items-end justify-center cursor-pointer">
          <span className="text-xs leading-3 font-bold">{user?.fullName}</span>
          <span className="text-[10px] text-gray-500 text-right">
            {user?.publicMetadata.role as string}
          </span>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
