import Announcements from "@/components/Announcements";
import AttendanceChartContainer from "@/components/AttendanceChartContainer";
import CountChartContainer from "@/components/CountChartContainer";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import FinanceChart from "@/components/FinanceChart";
import UserData from "@/components/UserData";

const AdminPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* left */}
      <div className="w-full lg:w-2/3 flex flex-col gap-4 ">
        <div className="flex justify-between gap-4 flex-wrap">
          <UserData type="admin" />
          <UserData type="student" />
          <UserData type="teacher" />
          <UserData type="parent" />
        </div>
        {/* middle charts */}
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {/* count charts */}
          <div className="w-full lg:w-1/3 h-90 ">
            <CountChartContainer />
          </div>
          {/* attendance chart */}
          <div className="w-full lg:w-2/3 h-90">
            <AttendanceChartContainer />
          </div>
        </div>
        {/* bottom charts */}
        <div className="w-full h-125">
          <FinanceChart />
        </div>
      </div>
      {/* right */}
      <div className="w-full lg:w-1/3 flex flex-col gap-8  ">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
