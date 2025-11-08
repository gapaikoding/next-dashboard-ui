"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", students: 400 },
  { name: "Feb", students: 300 },
  { name: "Mar", students: 200 },
  { name: "Apr", students: 278 },
  { name: "May", students: 189 },
];

const TestChart = () => {
  return (
    <div className="w-full h-64 bg-white p-4 rounded-xl shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="students" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TestChart;
