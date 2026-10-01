import ArrowDownRightIcon from "./components/icon/arrow-down-right-icon";
import PortfolioExplorer from "./components/portfolio-explorer";
import Tabs from "./components/tabs";

export default function Home() {
  const balance: number = 9351.12;
  return (
    <div className="relative flex flex-col h-full w-full items-center justify-center">
      <div className="absolute inset-0 w-full h-full flex flex-col items-start justify-between p-10">
        <div className="flex flex-row gap-x-6 z-100 justify-start text-xl items-center underline-offset-6">
          <h1 className="sr-only">Dashboard</h1>
          <PortfolioExplorer balance={balance} />
        </div>

        <Tabs />
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
