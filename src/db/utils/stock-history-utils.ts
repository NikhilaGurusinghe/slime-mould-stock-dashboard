import "server-only";
import db from "../db-connection";
import { stockHistoryTable } from "../schema";

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

export async function getStockHistoryForChart() {}
