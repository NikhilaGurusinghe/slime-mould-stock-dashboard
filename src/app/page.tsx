import HomepageControls from "./components/homepage-controls";
import PortfolioExplorer from "./components/portfolio-explorer";
import SlimeStatusHistory from "./components/slime-status-history";
import Tabs from "./components/tabs";

export default function Home() {
  const balance: number = 9351.12;
  return (
    <div className="relative flex flex-col h-full w-full items-center justify-center">
      <HomepageControls balance={balance} profitAndLoss={123.1} />

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
