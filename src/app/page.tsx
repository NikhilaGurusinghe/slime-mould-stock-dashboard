import PortfolioExplorer from "./components/portfolio-explorer";
import SlimeStatusHistory from "./components/slime-status-history";
import Tabs from "./components/tabs";

export default function Home() {
  const balance: number = 9351.12;
  return (
    <div className="relative flex flex-col h-full w-full items-center justify-center">
      <div className="absolute inset-0 w-full h-full flex flex-col items-start justify-between p-5 md:p-10">
        <div className="flex flex-row  gap-x-6 z-100 justify-start text-xl items-center underline-offset-6">
          <h1 className="sr-only">Dashboard</h1>
          <PortfolioExplorer balance={balance} profitAndLoss={-139.1} />
        </div>

        <div className="flex flex-row w-full items-end justify-between -mb-2">
          <SlimeStatusHistory
            statuses={[
              {
                status: "Physarum is currently deciding...",
                statusColour: "#4efa7b",
                date: 12345,
                message: "Physarum has made a decision",
                subMessage: "Decided to buy stock A",
                image: "test",
                iconName: "decision",
              },
            ]}
          />
          <Tabs tabButtonNames={["month", "year to date", "max"]} />
        </div>
      </div>

      <main
        id="content"
        className="flex w-full h-full items-center justify-center"
      >
        Chart
        <div></div>
      </main>
    </div>
  );
}
