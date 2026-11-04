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
      const randomColour = `#${randomColourFromString(symbol)}`;

      return {
        symbol,
        lastdayPrice: Number(lastdayPrice),
        qty,
        fill: randomColour,
      };
    },
  );

  console.log(chartData);
  console.log(chartConfig);

  return (
    <ChartContainer
      config={chartConfig}
      className="h-full w-full aspect-square mx-auto"
    >
      <PieChart accessibilityLayer>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="lastdayPrice"
          nameKey="symbol"
          innerRadius={50}
          isAnimationActive={false}
        />
      </PieChart>
    </ChartContainer>
  );
}
