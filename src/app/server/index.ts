import nodeCron from "node-cron";
import alpacaPaper from "../alpaca/alpaca-connection";

const tasks: ReturnType<typeof nodeCron.schedule>[] = [];

export async function registerStockPriceUpdateCron() {
  console.log("[Cron] Registering Report Cron...");
  // At 17:00 (5pm) on every day-of-week from Monday through Friday.
  // NASDAQ market closes at 4pm EST
  const task = nodeCron.schedule(
    "0 17 * * 1-5",
    async () => {
      // update daily closing price for stocks in portfolio
      // TODO need to check for market holidays
      // get all stocks in our portfolio from alpaca
      // const portfolio = await alpacaPaper

      // for each stock ticker, check the closing price (price at 4pm EST)
      // and then add this to our database
      // stockTicker, tradingDate, closingPrice

      // TODO this will probably be replaced

    },
    {
      name: "daily-stock-price-update",
      timezone: "America/New_York",
    },
  );
}

export function initCronJobs() {
  registerStockPriceUpdateCron();
}
