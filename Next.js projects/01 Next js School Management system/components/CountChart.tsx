"use client";
import Image from "next/image";
import { RadialBar, RadialBarChart } from "recharts";

const CountChart = ({ boys, girls }: { boys: number; girls: number }) => {
  const data = [
    {
      name: "Total",
      count: boys + girls,
      fill: "#ffffff",
    },
    {
      name: "Girls",
      count: girls,
      fill: "#C3EBFA",
    },
    {
      name: "Boys",
      count: boys,
      fill: "#FAE27C",
    },
  ];

  return (
    <div className="w-full h-[69%] relative">
      <RadialBarChart
        responsive
        cx="50%"
        cy="50%"
        barSize={40}
        data={data}
        className="h-full"
        innerRadius="30%"
        outerRadius="90%"
      >
        <RadialBar background dataKey="count" />
      </RadialBarChart>
      <Image
        src={"/maleFemale.png"}
        alt="maleFemale"
        width={50}
        height={50}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default CountChart;
