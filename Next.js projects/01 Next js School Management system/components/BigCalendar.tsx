"use client";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
// react-big-calendar/lib/css/react-big-calendar.css
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

type EventsType = {
  title: string;
  start: Date;
  end: Date;
};


const BigCalendar = ({ calendarEvents }: { calendarEvents: EventsType[] }) => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);
  const handleChangeView = (selectedView: View) => {
    setView(selectedView);
  };
  return (
      <Calendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        views={["work_week", "day"]}
        view={view}
        onView={handleChangeView}
        style={{ minHeight: "100%" }}
        min={new Date(0, 0, 0, 8, 0, 0)}
        max={new Date(0, 0, 0, 18, 0, 0)}
      />
  );
};
export default BigCalendar;
