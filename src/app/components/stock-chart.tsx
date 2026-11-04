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
const chartConfig = {
  portfolioValue: {
    label: "Value",
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
              className="bg-(--color-highlight)/30 backdrop-blur-xs border-white/10"
              labelFormatter={(value) => {
                const dateLabel = new Date(value).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
                return (
                  <div className="uppercase tracking-wide">{dateLabel}</div>
                );
              }}
              formatter={(value, name) => (
                <div className="flex flex-col text-xl w-fit items-start text-muted-foreground font-extrabold">
                  <div className="flex items-baseline font-stretch-110% font-semibold text-foreground tabular-nums">
                    <span className="font-normal">$</span>
                    {Number(value).toFixed(2)}
                  </div>
                  <div className="font-normal text-white/60 text-xs p-0 m-0">
                    <span>in USD</span>
                  </div>
                </div>
              )}
            />
          }
        />
        <Line
          dataKey="portfolioValue"
          type="monotone"
          stroke="var(--color-highlight)"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ChartContainer>
  );
}
