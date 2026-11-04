// TODO
//  - get total historical portfolio price (total) for every single day to display on line chart
//  - (later) need to make this able to return lots of data i.e. pagination

import type { NextRequest } from "next/server";
import {
  getPortfolioPriceDaily,
  type PortfolioPriceDaily,
} from "@/db/utils/stock-history-utils";

export async function GET(request: NextRequest) {
  const portfolioPriceDaily: PortfolioPriceDaily[] =
    await getPortfolioPriceDaily();

  return Response.json(portfolioPriceDaily);
}
