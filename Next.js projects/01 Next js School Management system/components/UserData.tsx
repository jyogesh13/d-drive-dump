import { prisma } from "@/lib/prisma";
import Image from "next/image";

const UserData = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  let data;
  switch (type) {
    case "admin":
      data = await prisma.admin.count();
      break;
    case "teacher":
      data = await prisma.teacher.count();
      break;
    case "student":
      data = await prisma.student.count();
      break
    case "parent":
      data = await prisma.parent.count();
      break
  }
  return (
    <div className="rounded-2xl odd:bg-Purple even:bg-Yellow p-4 flex-1 min-w-32.5  ">
      {/* first */}
      <div className="flex justify-between items-center">
        <span className="py-1 px-2 bg-white rounded-full text-green-600 text-[10px]">
          2026/03
        </span>
        <Image src={"/more.png"} alt="more" width={20} height={20} />
      </div>
      {/* second */}
      <div className="text-2xl font-semibold my-2">{data}</div>
      {/* third */}
      <div className="capitalize text-gray-500 font-medium text-sm ">
        {type + "s"}
      </div>
    </div>
  );
};

export default UserData;
