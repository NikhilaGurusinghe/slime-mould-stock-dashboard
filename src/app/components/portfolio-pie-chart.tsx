import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./shadcn/chart";
import type { PortfolioPosition } from "./homepage-controls";
import { randomColourFromString } from "../lib/utils/colour-utils";

export const description = "A donut chart";

export default function PortfolioPieChart(props: {
  portfolioContents: PortfolioPosition[];
}) {
  // dynamically generating chart config
  const chartConfig: ChartConfig = {
    lastdayPrice: {
      label: "Price",
    },
  };

  const chartData = props.portfolioContents.map(
    ({ symbol, lastdayPrice, qty }) => {
      const randomColour = `#${randomColourFromString(symbol, "ffff00")}`;

      return {
        symbol,
        lastdayPrice: Number(lastdayPrice),
        qty,
        fill: randomColour,
      };
    },
  );

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full aspect-square mx-auto"
    >
      <PieChart accessibilityLayer>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              className="bg-black/70 backdrop-blur-xs border-white/30"
              labelFormatter={(label, payload) => {
                const symbol: string = payload?.[0]?.payload?.symbol ?? "";
                const qty: number | undefined = payload?.[0]?.payload?.qty;

                return (
                  <div className="flex flex-row uppercase items-baseline text-xl tracking-wide gap-x-2.5">
                    {symbol}
                    {qty !== undefined && (<div className="text-xs">{Number(qty).toFixed(2)} <span className="text-white/60">units</span></div>)}
                    
                  </div>
                );
              }}
              formatter={(value, name, item, index) => {
                return (
                  <div className="flex flex-col">
                    <div className="flex text-lg items-baseline font-stretch-110% font-semibold text-foreground tabular-nums">
                      <span className="font-normal">$</span>
                      {Number(value).toFixed(2)}
                    </div>
                    <div className="font-normal text-white/60 text-xs p-0 m-0">
                      <span>in USD</span>
                    </div>
                  </div>
                );
              }}
            />
          }
        />
        <Pie
          className="border-4 border-white"
          data={chartData}
          dataKey="lastdayPrice"
          nameKey="symbol"
          isAnimationActive={false}
          stroke="#ffffff"
          strokeOpacity={0.3}
          strokeWidth={2}
          fillOpacity={0.97}
        />
      </PieChart>
    </ChartContainer>
  );
}
