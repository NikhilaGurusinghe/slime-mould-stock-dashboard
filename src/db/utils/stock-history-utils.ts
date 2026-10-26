import "server-only";
import db from "../db-connection";
import { stockHistoryTable } from "../schema";
import { sum } from "drizzle-orm";

// tradingDate in yyyy-mm-dd
export async function updateStockHistory(
  stockTicker: string,
  tradingDate: Date,
  closingPrice: number,
) {
  const updated = await db.insert(stockHistoryTable).values({
    stockTicker: stockTicker,
    tradingDate: tradingDate.toISOString().split("T")[0],
    closingPrice: closingPrice,
  });

  // TODO probably return something useful from here
}

export async function getPortfolioPriceDaily(): Promise<
  {
    tradingDate: string;
    portfolioValue: string;
  }[]
> {
  // SELECT SUM(closingPrice) FROM stock_history_table GROUP BY tradingDate
  const stockHistoryDaily = await db
    .select({
      tradingDate: stockHistoryTable.tradingDate,
      portfolioValue: sum(stockHistoryTable.closingPrice),
    })
    .from(stockHistoryTable)
    .groupBy(stockHistoryTable.tradingDate);

  return stockHistoryDaily.map(({ tradingDate, portfolioValue }) => ({
    tradingDate: tradingDate,
    portfolioValue: portfolioValue !== null ? portfolioValue : "0",
  }));
}
