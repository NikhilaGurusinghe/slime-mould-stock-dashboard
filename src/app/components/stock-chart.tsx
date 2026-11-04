"use client";

import { Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./shadcn/chart";
import alpacaPaper from "../alpaca/alpaca-connection";

export const description = "A multiple line chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 0 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--color-highlight)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export default function StockChart(props: {}) {
  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart accessibilityLayer data={chartData} margin={{ left: -1 }}>
        <XAxis dataKey="month" tickLine={false} axisLine={false} tick={false} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Line
          dataKey="mobile"
          type="monotone"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          dot={false}
        />
        <Line
          dataKey="desktop"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
