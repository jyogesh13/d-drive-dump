import Image from "next/image";
import CountChart from "./CountChart";
import { prisma } from "@/lib/prisma";

const CountChartContainer = async () => {
  const data = await prisma.student.groupBy({
    by: ["gender"],
    _count: true,
  });
  const boys = data.find(d=>d.gender === "MALE")?._count || 0;
  const girls = data.find(d=>d.gender === "FEMALE")?._count || 0;
  return (
    <div className="w-full h-full p-3 rounded-2xl shadow-md shadow-mauve-500">
      {/* top section */}
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">Students</span>
        <Image src={"/moreDark.png"} alt="" width={20} height={20} />
      </div>
      {/* middle count chart */}
      <CountChart boys={boys} girls={girls}/>
      {/* bottom legends */}
      <div className="w-full flex items-center justify-center gap-8 ">
        <div className="flex flex-col">
          <span className="w-5 h-5 bg-Yellow rounded-full" />
          <span className="font-bold">{boys}</span>
          <span className="text-xs text-gray-400">Boys ({Math.round((boys/(girls+boys))*100)}%)</span>
        </div>
        <div className="flex flex-col">
          <span className="w-5 h-5 bg-SkyColor rounded-full" />
          <span className="font-bold">{girls}</span>
          <span className="text-xs text-gray-400">Girls ({Math.round((girls/(girls+boys))*100)}%)</span>
        </div>
      </div>
    </div>
  );
};

export default CountChartContainer;
