"use client";

import { Line, LineChart, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "./shadcn/chart";
import type { PortfolioPriceDaily } from "@/db/utils/stock-history-utils";

export const description = "A multiple line chart";
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 0 },
// ];
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

export default function StockChart(props: {
  portfolioPriceHistoryDaily: PortfolioPriceDaily[];
}) {
  console.log(props.portfolioPriceHistoryDaily);

  return (
    <ChartContainer config={chartConfig} className="h-full w-full">
      <LineChart
        accessibilityLayer
        data={props.portfolioPriceHistoryDaily}
        margin={{ left: -1 }}
      >
        <XAxis
          dataKey="tradingDate"
          tickLine={false}
          axisLine={false}
          tick={false}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              className="bg-(--color-highlight)/30 backdrop-blur-md border-white/10"
              labelFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
              }}
              formatter={(value, name) => (
                <div className="flex text-lg w-fit items-center text-muted-foreground font-extrabold">
                  <div className="flex text-xl items-baseline gap-0.5 font-stretch-110% font-semibold text-foreground tabular-nums">
                    <span className="font-normal">$</span>
                    {value}
                  </div>
                </div>
              )}
            />
          }
        />
        <Line
          dataKey="portfolioValue"
          type="monotone"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
