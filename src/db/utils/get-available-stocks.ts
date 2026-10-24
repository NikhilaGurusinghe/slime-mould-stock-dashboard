import "server-only";

import db from "../db-connection";
import { stocksTable } from "../schema";

export async function getAvailableStocksTickers(): Promise<string[]> {
  const availableStocks = await db
    .select({ stockTicker: stocksTable.stockTicker })
    .from(stocksTable);

  return availableStocks.map(({ stockTicker }) => stockTicker);
}
