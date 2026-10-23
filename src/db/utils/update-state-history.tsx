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
}
