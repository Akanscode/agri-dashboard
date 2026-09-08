"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PriceChartProps {
  data: { date: string; price: number }[];
  title: string;
}

export default function PriceChartClient({ data, title }: PriceChartProps) {
  return (
    <div className="bg-cream border border-border rounded-sm shadow-classic p-6">
      <h2 className="font-serif text-lg font-bold text-navy mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="2 4" stroke="#E3DDD0" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#6B7280" }} />
          <YAxis tick={{ fontSize: 11, fill: "#6B7280" }} />
          <Tooltip
            contentStyle={{ borderRadius: 2, border: "1px solid #E3DDD0", fontSize: 12 }}
          />
          <Line type="monotone" dataKey="price" stroke="#1F3B57" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
