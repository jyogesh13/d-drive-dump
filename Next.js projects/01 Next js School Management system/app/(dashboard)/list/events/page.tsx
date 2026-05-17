import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { Class, Event, Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { ITEMS_PER_PAGE } from "@/lib/settings";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";

type EventList = Event & { class: Class };

const EventListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { userId, sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  const currentUserId = userId;

  const columns = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Class",
      accessor: "class",
    },
    {
      header: "Date",
      accessor: "date",
      className: "hidden md:table-cell",
    },
    {
      header: "Start Time",
      accessor: "startTime",
      className: "hidden md:table-cell",
    },
    {
      header: "End Time",
      accessor: "endTime",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "actions",
          },
        ]
      : []),
  ];

  const renderRow = (item: EventList) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-LightPurple"
    >
      <td className="p-3 ">{item.title}</td>
      <td className="">{item.class?.name || "-"}</td>
      <td className="hidden md:table-cell">{item.startTime.toDateString()}</td>
      <td className="hidden md:table-cell">
        {item.startTime.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>
      <td className="hidden md:table-cell">
        {item.endTime.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}
      </td>
      <td className="">
        {/* action buttons */}
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="event" type="update" data={item} />
              <FormContainer table="event" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  const { page, ...queryParams } = await searchParams;

  const p = page ? Number.parseInt(page) : 1;

  // URL PARAMS CONDITION

  const andConditions: Prisma.EventWhereInput[] = [];

  if (queryParams.classId) {
    andConditions.push({ classId: Number.parseInt(queryParams.classId) });
  }

  if (queryParams.search) {
    andConditions.push({
      OR: [
        { title: { contains: queryParams.search, mode: "insensitive" } },
        { description: { contains: queryParams.search, mode: "insensitive" } },
        {
          class: {
            name: { contains: queryParams.search, mode: "insensitive" },
          },
        },
      ],
    });
  }

  // ROLE CONDITIONS
  const roleConditions = {
    teacher: {
      OR: [
        { lessons: { some: { teacherId: currentUserId! } } },
        { supervisorId: currentUserId! },
      ],
    },
    student: { students: { some: { id: currentUserId! } } },
    parent: { students: { some: { parentId: currentUserId! } } },
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

  const query: Prisma.EventWhereInput = andConditions.length
    ? { AND: andConditions }
    : {};

  const [events, count] = await prisma.$transaction([
    prisma.event.findMany({
      where: query,
      include: {
        class: true,
        reads: {
          where: { userId: currentUserId! },
          select: { id: true },
        },
      },
      take: ITEMS_PER_PAGE,
      skip: ITEMS_PER_PAGE * (p - 1),
    }),
    prisma.event.count({ where: query }),
  ]);

  const data = events.map((e) => ({
    ...e,
    isRead: e.reads.length > 0,
  }));

  for (const event of events) {
    await prisma.eventRead.upsert({
      where: {
        userId_eventId: {
          userId: currentUserId!,
          eventId: event.id,
        },
      },
      update: {},
      create: {
        userId: currentUserId!,
        eventId: event.id,
      },
    });
  }

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* top */}
      <div className="flex justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center justify-center">
          {/* search bar */}
          <TableSearch />
          <div className="flex items-center justify-center self-end gap-3">
            <button className="w-8 h-8  rounded-full flex items-center justify-center  bg-Yellow">
              <Image
                src={"/filter.png"}
                alt="filter.png"
                width={14}
                height={14}
              />
            </button>
            <button className="w-8 h-8  rounded-full flex items-center justify-center  bg-Yellow">
              <Image src={"/sort.png"} alt="sort.png" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="event" type="create" />}
          </div>
        </div>
      </div>
      {/* Events list */}
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* Pagination */}
      <Pagination page={p} count={count} />
    </div>
  );
};

export default EventListPage;
