import React from "react";

import {Circle} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const StatisticRealtime = ({block}: any) => {
  const generateData = () => [
    {
      name: "Jan",
      value: Math.floor(Math.random() * 401),
      value2: Math.floor(Math.random() * 401),
    },
    {
      name: "Feb",
      value: Math.floor(Math.random() * 401),
      value2: Math.floor(Math.random() * 401),
    },
    {
      name: "Mar",
      value: Math.floor(Math.random() * 401),
      value2: Math.floor(Math.random() * 401),
    },
    {
      name: "Apr",
      value: Math.floor(Math.random() * 401),
      value2: Math.floor(Math.random() * 401),
    },
    {
      name: "May",
      value: Math.floor(Math.random() * 401),
      value2: Math.floor(Math.random() * 401),
    },
    {
      name: "Jun",
      value: Math.floor(Math.random() * 401),
      value2: Math.floor(Math.random() * 401),
    },
    {
      name: "Jul",
      value: Math.floor(Math.random() * 401),
      value2: Math.floor(Math.random() * 401),
    },
  ];
  const [datas, setData] = React.useState<any[]>([]);
  return (
    <div className="p-4 bg-background rounded-lg w-full">
      <h2 className="text-xl font-bold flex items-center gap-2">
        Monthly Data{" "}
        <Circle onClick={() => setData(generateData())} size={20} />{" "}
      </h2>
      <ResponsiveContainer height={400} className=" w-full">
        <LineChart data={datas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="value2"
            stroke="#e9a43c"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatisticRealtime;
