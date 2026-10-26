"use client";

import { useEffect, useState } from "react";
import PortfolioExplorer from "./portfolio-explorer";
import SlimeStatusHistory, {
  SlimeStatusAndHistory,
} from "./slime-status-history";
import Tabs from "./tabs";
import {
  type DashboardDataUpdate,
  dashboardDataUpdateEventName,
  dashboardDataUpdateEventURL,
} from "../lib/observers/dashboard-data-update";
import { useSSE } from "use-next-sse";

export default function HomepageControls(props: {
  balance: number;
  profitAndLoss: number;
}) {
  // open/close menu stuff
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  // data from database
  const [statusHistory, setStatusHistory] = useState<SlimeStatusAndHistory[]>(
    [],
  );

  const { data, error, connectionState } = useSSE<DashboardDataUpdate>({
    url: dashboardDataUpdateEventURL,
    eventName: dashboardDataUpdateEventName,
    reconnect: true,
  });

  useEffect(() => {
    if (data?.type === "state-history-updated") {
      // update the statuses object fed into SlimeStatusHistory
      // fetch("/api/v1/status").then((response) => {
      //   if (!response.ok) throw new Error("homepage-controls failed to load slime status history");
      //   return response.json() as
      // })
      console.log("hello from sse land", data, connectionState);
    }
  }, [data, connectionState]);

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
              date: new Date(),
              message: "Physarum has made a decision",
              messageDetails: "hello",
              image: "test",
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
