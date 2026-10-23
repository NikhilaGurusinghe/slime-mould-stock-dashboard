import "server-only";

import { drizzle } from "drizzle-orm/libsql";
import { stocksTable } from "../schema";

const db = drizzle(process.env.DB_FILE_NAME!);

export async function getAvailableStocksTickers(): Promise<string[]> {
  const availableStocks = await db
    .select({ stockTicker: stocksTable.stockTicker })
    .from(stocksTable);

  return availableStocks.map(({ stockTicker }) => stockTicker);
}
