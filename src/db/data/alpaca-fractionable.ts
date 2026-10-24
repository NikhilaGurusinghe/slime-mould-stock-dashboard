import alpacaPaper from "@/app/alpaca/alpaca-connection";
import { stocksTable } from "@/db/schema";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";

import { drizzle } from "drizzle-orm/libsql";

const dbLocation: string | undefined  = process.env.DB_FILE_NAME;
if (!dbLocation) throw new Error("DB_FILE_NAME is not set");

const db = drizzle(dbLocation);

export async function getAvailableStocksTickers(): Promise<string[]> {
    const availableStocks = await db
      .select({ stockTicker: stocksTable.stockTicker })
      .from(stocksTable);
  
    return availableStocks.map(({ stockTicker }) => stockTicker);
  }
  

const REQUEST_INTERVAL_MS = 500;
const MAX_429_RETRIES = 5;

const availableStocksTickers: string[] =
        await getAvailableStocksTickers();

console.log(availableStocksTickers);

type LookupResult = {
    symbol: string;
    fractionable: boolean | null;
    error?: unknown;
  };
  
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  
  function getStatus(error: unknown): number | undefined {
    if (typeof error !== "object" || error === null) return undefined;
  
    const err = error as {
      status?: unknown;
      statusCode?: unknown;
      response?: { status?: unknown };
    };
  
    const status = err.status ?? err.statusCode ?? err.response?.status;
    return typeof status === "number" ? status : undefined;
  }
  
  function getErrorMessage(error: unknown): string {
    if (error instanceof Error) return error.message;
  
    try {
      return JSON.stringify(error);
    } catch {
      return String(error);
    }
  }
  
  function escapeCsv(value: string): string {
    return `"${value.replaceAll('"', '""')}"`;
  }
  
  let lastRequestStarted = 0;
  
  async function getAssetWithRetry(
    symbol: string,
    progress: string,
  ) {
    for (let attempt = 0; ; attempt++) {
      // Space out request starts, including retries.
      const waitMs = Math.max(
        0,
        REQUEST_INTERVAL_MS - (Date.now() - lastRequestStarted),
      );
  
      if (waitMs > 0) {
        console.log(`${progress} Waiting ${waitMs} ms before the request...`);
        await sleep(waitMs);
      }
  
      lastRequestStarted = Date.now();
  
      try {
        console.log(`${progress} Sending asset lookup for ${symbol}...`);
  
        return await alpacaPaper.trading.assets.getV2AssetsSymbolOrAssetId({
          symbolOrAssetId: symbol,
        });
      } catch (error) {
        const status = getStatus(error);
  
        if (status !== 429 || attempt >= MAX_429_RETRIES) {
          throw error;
        }
  
        const backoffMs = 1_000 * 2 ** attempt;
        console.warn(
          `${progress} Rate limit reached for ${symbol}. ` +
            `Retry ${attempt + 1}/${MAX_429_RETRIES} in ${backoffMs} ms.`,
        );
  
        await sleep(backoffMs);
      }
    }
  }
  
  const total = availableStocksTickers.length;
  const results: LookupResult[] = [];
  const startedAt = Date.now();
  
  console.log(`Starting fractionability checks for ${total} symbol(s).`);
  
  for (const [index, symbol] of availableStocksTickers.entries()) {
    const progress = `[${index + 1}/${total}]`;
  
    console.log(`\n${progress} Checking ${symbol}...`);
  
    try {
      const asset = await getAssetWithRetry(symbol, progress);
  
      results.push({
        symbol,
        fractionable: asset.fractionable,
      });
  
      console.log(
        `${progress} ${symbol}: fractionable = ${asset.fractionable}`,
      );
    } catch (error) {
      results.push({
        symbol,
        fractionable: null,
        error,
      });
  
      const status = getStatus(error);
      const statusText = status === undefined ? "" : ` (HTTP ${status})`;
  
      console.error(
        `${progress} Failed to check ${symbol}${statusText}: ` +
          getErrorMessage(error),
      );
    }
  }
  
  const fractionableResults = results.filter(
    (row) => row.fractionable === true,
  );
  
  const csvLines = [
    ["symbol", "fractionable"],
    ...fractionableResults.map((row) => [row.symbol, "true"]),
  ].map((columns) => columns.map(escapeCsv).join(","));
  
  const filePath = join(process.cwd(), "fractionable-stocks.csv");
  
  console.log(`\nWriting ${fractionableResults.length} fractionable symbol(s) to CSV...`);
  
  await writeFile(filePath, csvLines.join("\n") + "\n", "utf8");
  
  const failedCount = results.filter((row) => row.error !== undefined).length;
  const elapsedSeconds = ((Date.now() - startedAt) / 1_000).toFixed(1);
  
  console.log("\nFinished.");
  console.log(`Symbols checked: ${total}`);
  console.log(`Fractionable: ${fractionableResults.length}`);
  console.log(`Failed lookups: ${failedCount}`);
  console.log(`Time elapsed: ${elapsedSeconds} seconds`);
  console.log(`CSV saved to: ${filePath}`);