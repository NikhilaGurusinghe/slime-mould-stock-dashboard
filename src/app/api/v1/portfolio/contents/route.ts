// TODO
//  - get portfolio contents (units, whatever alpaca gives) to display on pie chart (use get-portfolio-details.ts?)

import { NextRequest } from "next/server";
import alpacaPaper from "@/app/alpaca/alpaca-connection";

export async function GET(request: NextRequest) {
  // request to alpaca to get all open positions (we don't care about stuff that's sold etc.)
  const portfolioContents =
    await alpacaPaper.trading.positions.getAllOpenPositions();

  return Response.json(portfolioContents);
}
