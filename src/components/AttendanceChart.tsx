"use client";

import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// #region Sample data
const data = [
  {
    name: "Mon",
    present: 60,
    absent: 52,
    reschedule: 13
  },
  {
    name: 'Tue',
    present: 61,
    absent: 50,
    reschedule: 12,
  },
  {
    name: 'Wed',
    present: 65,
    absent: 55,
    reschedule: 13,
  },
  {
    name: 'Thu',
    present: 63,
    absent: 56,
    reschedule: 14,
  },
  {
    name: 'Fri',
    present: 59,
    absent: 52,
    reschedule: 11,
  },
  {
    name: 'Sat',
    present: 72,
    absent: 65,
    reschedule: 13,
  },
  {
    name: 'Sun',
    present: 66,
    absent: 53,
    reschedule: 12,
  },
];

// Custom Legend
const CustomLegend = (props: any) => {
  const { payload } = props;
  // pastikan urutan sesuai keinginan
  const order = ["present", "absent", "reschedule"];
  const sorted = order
    .map((key) => payload.find((item: any) => item.dataKey === key))
    .filter(Boolean);

  return (
    <ul className="flex gap-6 mt-2 text-sm text-gray-600">
      {sorted.map((entry: any) => (
        <li key={entry.value} className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value.charAt(0).toUpperCase() + entry.value.slice(1)}
        </li>
      ))}
    </ul>
  );
};

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Joytalk English Attendance</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20} margin={{ top: 0, right: 20, left: -20, bottom: 0 }} >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            // align="left"
            // verticalAlign="top"
            // wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
            content={<CustomLegend />}
            align="left"
            verticalAlign="top"
            wrapperStyle={{
              paddingTop: "10px",
              paddingBottom: "30px",
              paddingLeft: "30px",
            }}
          />
          <Bar
            dataKey="present"
            fill="#C3EBFA"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="absent"
            fill="oklch(88.5% 0.062 18.334)"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="reschedule"
            fill="oklch(92.4% 0.12 95.746)"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;