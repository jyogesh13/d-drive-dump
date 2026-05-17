"use client";
import Image from "next/image";
import { Pie, PieChart } from "recharts";

const data = [
  { name: "Group A", value: 92, fill: "#C3EBFA" },
  { name: "Group B", value: 8, fill: "#FAE27C" },
];

const Performance = ({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md relative h-70">
      <div className="flex items-center justify-between ">
        <h1 className="text-xl font-semibold">Performance</h1>
        <Image src={"/moreDark.png"} alt="more" width={20} height={20} />
      </div>
      <PieChart
        responsive
        className="w-full h-full aspect-2/1"
        // style={{
        //   aspectRatio: 2,
        // }}
      >
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx="50%"
          cy="55%"
          outerRadius="115"
          innerRadius="70"
          fill="#8884d8"
          isAnimationActive={isAnimationActive}
        />
      </PieChart>
      <div className="absolute top-37 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">9.2</h1>
        <p className="text-xs text-gray-300">of 10 max ANS </p>
      </div>
      <h2 className="font-medium absolute bottom-12 left-0 right-0 m-auto text-center">1st Semester &#8211; 2nd Semester</h2>
    </div>
  );
};

export default Performance;
