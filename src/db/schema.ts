import { inArray, sql } from "drizzle-orm";
import {
  check,
  index,
  integer,
  primaryKey,
  real,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";
import SlimeMouldDecision from "@/app/lib/slime-mould-decision";

// array needs to be non-empty hence the wacky type
const SlimeMouldDecisionEnumArray = Object.values(SlimeMouldDecision) as [
  SlimeMouldDecision,
  ...SlimeMouldDecision[],
];

// stock portfolio table is not needed -> handled by alpaca api

// these are all the available stocks that we can choose from
export const stocksTable = sqliteTable("stock_table", {
  stockTicker: text().primaryKey(),
});

// all the slime mould states that have been executed in the past
export const stateHistoryTable = sqliteTable(
  "state_history_table",
  {
    timestampMS: integer({ mode: "timestamp_ms" }).primaryKey(),
    state: text({ enum: SlimeMouldDecisionEnumArray }).notNull(),
    decision: text(), // can be null
    imagePath: text(), // also can be null
  },
  (table) => [
    check(
      "state_validity_check",
      inArray(table.state, SlimeMouldDecisionEnumArray).inlineParams(),
    ),
  ],
);

// this is used for charting stock performance and portfolio performance
// stores closing price of stock per day
export const stockHistoryTable = sqliteTable(
  "stock_history_table",
  {
    stockTicker: text().references(() => stocksTable.stockTicker),
    tradingDate: text().notNull(), // timestamp in yyyy-mm-dd
    closingPrice: real().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.stockTicker, table.tradingDate] }),
    index("stock_history_date_index").on(table.tradingDate),
    check(
      "trading_date_format_validity_check",
      sql`${table.tradingDate} GLOB '[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]'`, // timestamp in yyyy-mm-dd
    ),
  ],
);
