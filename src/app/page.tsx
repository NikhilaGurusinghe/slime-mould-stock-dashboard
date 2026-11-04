"use server";

import {
  type PortfolioPriceDaily,
  getPortfolioPriceDaily,
} from "@/db/utils/stock-history-utils";
import alpacaPaper from "./alpaca/alpaca-connection";
import HomepageControls from "./components/homepage-controls";
import StockChart from "./components/stock-chart";

// TODO pass alpaca api data into stockchart
// TODO pass database stuff regarding daily portfolio price into homepage controls
// TODO pass portfolio balance and p&l to homepage controls

export default async function Home() {
  const balance: number = 9351.12;

  // request to alpaca to get all open positions (we don't care about stuff that's sold etc.)
  // displayed on piechart
  const portfolioContents =
    await alpacaPaper.trading.positions.getAllOpenPositions();

  // get total historical portfolio price (total) for every single day to display on line chart
  const portfolioPriceDaily: PortfolioPriceDaily[] =
    await getPortfolioPriceDaily();

  return (
    <div className="relative flex flex-col h-full w-full items-center justify-center">
      <HomepageControls balance={balance} profitAndLoss={123.1} />

      <main
        id="content"
        className="flex w-full h-full items-end justify-center"
      >
        <div className="w-full h-[80%] items-center justify-center z-0 mb-10">
          <StockChart />
        </div>
      </main>
    </div>
  );
}
