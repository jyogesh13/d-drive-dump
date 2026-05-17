import { prisma } from "@/lib/prisma";
import React from "react";

const EventList = async ({
  dateParams,
}: {
  dateParams: string | undefined;
}) => {
  const date = dateParams ? new Date(dateParams) : new Date();
  const data = await prisma.event.findMany({
    where: {
      startTime: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lte: new Date(date.setHours(23, 59, 59, 999)),
      },
    },
  });
  return (
    <div>
      {data.map((event) => {
        return (
          <div
            className=" p-5 rounded-xl border-t-4 shadow-lg hover:shadow-md hover:shadow-Yellow drop-shadow-black odd:shadow-SkyColor even:shadow-Purple odd:border-t-SkyColor even:border-t-Purple "
            key={event.id}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold text-gray-600">{event.title}</h1>
              <span className="text-gray-400 text-xs">
                {event.startTime.toISOString().split("T")[1].slice(0, 5)}
              </span>
            </div>
            <p className="mt-2 text-gray-400 text-sm">{event.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
