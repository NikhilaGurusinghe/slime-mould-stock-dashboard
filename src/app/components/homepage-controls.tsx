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
    <div className="absolute inset-0 w-full h-full flex flex-col items-start justify-between p-5 md:p-10">
      <div className="flex flex-row gap-x-6 z-100 justify-start text-xl items-center underline-offset-6">
        <h1 className="sr-only">Dashboard</h1>
        <PortfolioExplorer
          isOpen={isExplorerOpen}
          setIsOpen={(value: boolean) => {
            if (value === true && isStatusOpen) {
              setIsStatusOpen(false);
            }
            setIsExplorerOpen(value);
          }}
          balance={props.balance}
          profitAndLoss={props.profitAndLoss}
        />
      </div>

      <div className="flex flex-row w-full items-end justify-between -mb-2 gap-x">
        <SlimeStatusHistory
        isOpen={isStatusOpen}
        setIsOpen={(value: boolean) => {
            if (value === true && isExplorerOpen) {
              setIsExplorerOpen(false);
            }
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
        <Tabs tabButtonNames={["month", "year to date", "max"]} />
      </div>
    </div>
  );
}
