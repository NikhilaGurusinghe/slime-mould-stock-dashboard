import "server-only";

import db from "../db-connection";
import { stateHistoryTable } from "../schema";
import type SlimeMouldDecision from "@/app/lib/slime-mould-decision";
import type SlimeMouldState from "@/app/lib/slime-mould-state";

export async function updateStateHistoryDefault(
  timestampMS: number,
  state: SlimeMouldState,
) {
  const updated = await db
    .insert(stateHistoryTable)
    .values({ timestampMS: new Date(timestampMS), state: state });

  // TODO probably return something from here
}

export async function updateStateHistoryDecision(
  timestampMS: number,
  state: SlimeMouldState,
  decision: SlimeMouldDecision,
  imagePath: string,
  stockTicker: string,
) {
  const updated = await db.insert(stateHistoryTable).values({
    timestampMS: new Date(timestampMS),
    state,
    stockTicker,
    decision,
    imagePath,
  });

  // TODO probably return something from here
}

// TODO i don't know why the stockTicker here can be nullable
export async function getAllStateHistory() {
  const allStateHistory = await db
    .select({
      timestampMS: stateHistoryTable.timestampMS,
      state: stateHistoryTable.state,
      stockTicker: stateHistoryTable.stockTicker,
      imagePath: stateHistoryTable.imagePath,
    })
    .from(stateHistoryTable);

  return allStateHistory;
}
