import HomepageControls from "./components/homepage-controls";
import StockChart from "./components/stock-chart";

export default function Home() {
  const balance: number = 9351.12;
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
