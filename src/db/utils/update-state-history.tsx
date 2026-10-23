import "server-only";

import db from "../db-connection";
import { stateHistoryTable } from "../schema";
import type SlimeMouldDecision from "@/app/lib/slime-mould-decision";
import type SlimeMouldState from "@/app/lib/slime-mould-state";

export async function updateStateHistoryDefault(state: SlimeMouldState) {}

export async function updateStateHistoryDecision(
  timestampMS: number,
  state: SlimeMouldState,
  decision: SlimeMouldDecision,
  imagePath: string,
  stockTicker: string,
) {
  const updated = await db.insert(stateHistoryTable).values({ timestampMS, state, decision, imagePath, stockTicker })
}
