"use client";

import { useCallback, useEffect, useState } from "react";
import PortfolioExplorer from "./portfolio-explorer";
import SlimeStatusHistory, {
  defaultSlimeStatusAndHistory,
  SlimeStatusAndHistory,
} from "./slime-status-history";
import Tabs from "./tabs";
import {
  type DashboardDataUpdate,
  dashboardDataUpdateEventName,
  dashboardDataUpdateEventURL,
} from "../lib/observers/dashboard-data-update";
import { useSSE } from "use-next-sse";
import { stateHistoryConversionSchema } from "./utils/state-history-conversion";
import { PortfolioPriceDaily } from "@/db/utils/stock-history-utils";

export type PortfolioPosition = {
  symbol: string;
  lastdayPrice: string;
  qty: string;
};

export default function HomepageControls(props: {
  balance: number;
  profitAndLoss: number;
  portfolioContents: PortfolioPosition[];
}) {
  // open/close menu stuff
  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);
  const [isStatusOpen, setIsStatusOpen] = useState<boolean>(false);

  // data from database
  const [statusHistory, setStatusHistory] = useState<SlimeStatusAndHistory[]>(
    [],
  );

  const loadHistory = useCallback(async () => {
    try {
      const response = await fetch("/api/v1/status");
      if (!response.ok)
        console.error("homepage-controls failed to fetch slime status history");

      const json = await response.json();
      const presentableStateHistoryRows: SlimeStatusAndHistory[] =
        stateHistoryConversionSchema.parse(json);

      setStatusHistory(presentableStateHistoryRows);
    } catch (error) {
      console.error(
        "homepage-controls failed to load slime status history:",
        error,
      );
    }
  }, []);
  const { data, error, connectionState } = useSSE<DashboardDataUpdate>({
    url: dashboardDataUpdateEventURL,
    eventName: dashboardDataUpdateEventName,
    reconnect: true,
  });

  // this is to initially init statusHistory state
  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  // this is our SSE handler see /api/v1/sse/route.ts for more information
  useEffect(() => {
    if (data?.type === "state-history-updated") {
      // update the statuses object fed into SlimeStatusHistory
      void loadHistory();
    }
  }, [data, loadHistory]);

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
          portfolioContents={props.portfolioContents}
        />
        <SlimeStatusHistory
          isOpen={isStatusOpen}
          setIsOpen={(value: boolean) => {
            setIsStatusOpen(value);
          }}
          statuses={
            statusHistory.length !== 0
              ? statusHistory
              : [defaultSlimeStatusAndHistory]
          }
        />
      </div>

      <div className="flex flex-2/10 flex-col h-full items-end justify-end">
        <Tabs tabButtonNames={["month", "year to date", "max"]} />
      </div>
    </div>
  );
}
