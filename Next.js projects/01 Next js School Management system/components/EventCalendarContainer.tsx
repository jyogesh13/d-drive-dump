import Image from "next/image";
import EventCalendar from "./EventCalendar";
import EventList from "./EventList";

const EventCalendarContainer = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { date } = await searchParams;

  return (
    <div className="bg-white p-4 shadow-md rounded-2xl">
      <EventCalendar />
      <div className="flex flex-col gap-">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold my-4">Events</span>
          <Image src={"/moreDark.png"} alt="" width={20} height={20} />
        </div>
        <EventList dateParams={date}/>
      </div>
    </div>
  );
};

export default EventCalendarContainer;
