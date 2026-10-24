"use client";

import { useState } from "react";
import PortfolioExplorer from "./portfolio-explorer";
import SlimeStatusHistory from "./slime-status-history";
import Tabs from "./tabs";

export default function HomepageControls(props: {
  balance: number;
  profitAndLoss: number;
}) {
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  return (
    <div className="pointer-events-none absolute w-full h-full flex flex-row items-start justify-between p-5 md:p-10 gap-x-3 z-10">
      <div className="flex-8/10 h-full flex flex-col gap-y-4 justify-between items-start">
        <h1 className="sr-only">Dashboard</h1>
        <PortfolioExplorer
          isOpen={isExplorerOpen}
          setIsOpen={(value: boolean) => {
            setIsExplorerOpen(value);
          }}
          balance={props.balance}
          profitAndLoss={props.profitAndLoss}
        />
        <SlimeStatusHistory
          isOpen={isStatusOpen}
          setIsOpen={(value: boolean) => {
            setIsStatusOpen(value);
          }}
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
      </div>

      <div className="flex flex-2/10 flex-col h-full items-end justify-end">
        <Tabs tabButtonNames={["month", "year to date", "max"]} />
      </div>
    </div>
  );
}
