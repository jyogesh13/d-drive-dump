import { prisma } from "@/lib/prisma";
import BigCalendar from "./BigCalendar";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const dataRes = await prisma.lesson.findMany({
    where: {
      ...(type === "teacherId"
        ? { teacherId: id as string }
        : { classId: id as number }),
    },
  });

  const calendarEvents = dataRes.map((lesson) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  console.log(calendarEvents)
  const data = adjustScheduleToCurrentWeek(calendarEvents)
  return (
    <div className="h-full w-full">
      <BigCalendar calendarEvents={data} />
    </div>
  );
};

export default BigCalendarContainer;
