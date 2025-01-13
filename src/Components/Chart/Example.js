import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function Example({ data, dataKey }) {
  return (
    <div
      style={{
        overflowX: "auto",
        overflowY: "hidden",
        width: "100%",
      }}
    >
      <BarChart
        width={800}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        barSize={20}
        s
      >
        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey={dataKey} fill="green" background={{ fill: "#eee" }} />
      </BarChart>
    </div>
  );
}
