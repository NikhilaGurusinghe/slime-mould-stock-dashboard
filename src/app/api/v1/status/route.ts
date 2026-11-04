import SlimeMouldDecision from "@/app/lib/slime-mould-decision";
import SlimeMouldState from "@/app/lib/slime-mould-state";
import { randomUUID } from "crypto";
import { mkdir, writeFileSync } from "fs";
import type { NextRequest } from "next/server";
import path from "path";
import z, { symbol } from "zod";
import { zfd } from "zod-form-data";
import crypto from "node:crypto";
import { getAvailableStocksTickers } from "@/db/utils/get-available-stocks";
import shuffleArrayInPlace from "@/app/lib/utils/shuffle-array";
import {
  getAllStateHistory,
  updateStateHistoryDecision,
} from "@/db/utils/state-history-utils";
import alpacaPaper from "@/app/alpaca/alpaca-connection";
import { userMaxPurchasePerTrade } from "@/app/lib/user-settings";
import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { publishDataUpdate } from "@/app/lib/observers/dashboard-data-update";
import { SlimeStatusAndHistory } from "@/app/components/slime-status-history";
const seedrandom = require("seedrandom");

const schemaDefault = zfd.formData({
  state: zfd.text(z.enum(SlimeMouldState)),
});

const schemaDecision = zfd.formData({
  state: zfd.text(z.literal(SlimeMouldState.SLIME_MOULD_DECISION)),
  decision: zfd.text(z.enum(SlimeMouldDecision)),
  image: zfd.file(),
});

const imageDirectory: string = "/slimeMouldStockDashboard/petriDishImages";

export type StateHistoryTableRow = {
  timestampMS: string; // JSON converts Date values to strings
  state: SlimeMouldState;
  stockTicker: string | null;
  imagePath: string | null;
};

export async function POST(request: NextRequest) {
  const formData: FormData = await request.formData();
  // https://www.codu.co/niall/zod-parse-versus-safeparse-what-s-the-difference-7t_tjfne
  const defaultParseResult: z.ZodSafeParseResult<{
    state: SlimeMouldState;
  }> = schemaDefault.safeParse(formData);
  // console.log(formData)

  // no status field found/no valid status field found
  if (!defaultParseResult.success) {
    return new Response("Status was not supplied or invalid.", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  const { state } = defaultParseResult.data;

  switch (state) {
    case SlimeMouldState.SLIME_MOULD_REMOVED:
      return new Response("Status update succeeded", {
        status: 200,
        statusText: "OK",
      });
    case SlimeMouldState.SLIME_MOULD_GROWING:
      return new Response("Status update succeeded", {
        status: 200,
        statusText: "OK",
      });
    case SlimeMouldState.SLIME_MOULD_DECISION: {
      // console.log("OMG IT WORKS!");
      const decisionParseResult: z.ZodSafeParseResult<{
        state: SlimeMouldState.SLIME_MOULD_DECISION;
        decision: SlimeMouldDecision;
        image: File;
      }> = schemaDecision.safeParse(formData);

      if (!decisionParseResult.success) {
        return new Response("Missing decision and/or image formData fields", {
          status: 400,
          statusText: "Bad Request",
        });
      }

      // decision is exposed here
      const { decision, image } = decisionParseResult.data;

      const bufferedImage: Buffer<ArrayBuffer> = Buffer.from(
        await image.arrayBuffer(),
      );

      // get list of available stocks
      // side note all of these stocks have been handpicked so that they should be fractionable
      const availableStocksTickers: string[] =
        await getAvailableStocksTickers();

      // take image hash + timestamp (from image name) to get random number
      const hasher: crypto.Hash = crypto.createHash("sha256");
      hasher.update(bufferedImage);
      const imageHash = hasher.digest("hex");
      // seeind the prng with our image hash
      const prng = seedrandom(imageHash);
      // shuffle our available stocks with our prng
      shuffleArrayInPlace(availableStocksTickers, prng);
      // prng() = random number between 0 and 1 (includes real numbers)
      // we want a random number from 0 to availableStocks.size twice
      // duplicates are fine here
      const stockPickATicker =
        availableStocksTickers[
          Math.floor(prng() * availableStocksTickers.length)
        ];
      const stockPickBTicker =
        availableStocksTickers[
          Math.floor(prng() * availableStocksTickers.length)
        ];

      if (stockPickATicker === null || stockPickBTicker === null) {
        throw new Error("failed to pick a stock");
      }

      let decidedStockPickTicker: string;

      // This assumes that the enum SlimeMouldDeccision has only two choices
      if (decision === SlimeMouldDecision.A) {
        decidedStockPickTicker = stockPickATicker;
      } else {
        decidedStockPickTicker = stockPickBTicker;
      }

      console.log(
        availableStocksTickers.length,
        stockPickATicker,
        stockPickBTicker,
        decision,
        decidedStockPickTicker,
      );

      // save image to disk with appropriate file name
      // use the last modified time here instead of the transmitted time (which is currently what image.name's
      // first part has)
      const imageStorageDirectory: string = path.join(
        process.cwd(),
        imageDirectory,
      );
      mkdir(imageStorageDirectory, { recursive: true }, (err) => {
        // TODO better error handling here
        if (err) throw err;
      });
      // console.log(uploadDirectory.toString());
      const imageFileName: string = `/${image.lastModified}_${randomUUID()}.jpg`;
      const imageFileLocation: string = path.join(
        imageStorageDirectory,
        imageFileName,
      );
      // TODO DEBUG uncomment this
      // writeFileSync(imageFileLocation, bufferedImage);

      console.log(decision, image);

      // execute fractional buy via alpaca
      // TODO DEBUG uncomment this
      // const buyOrder = await alpacaPaper.trading.orders.postOrder({
      //   createOrderRequest: {
      //     symbol: decidedStockPickTicker,
      //     notional: userMaxPurchasePerTrade.toFixed(2), // 2 decimal points of precision
      //     side: "buy",
      //     type: "market",
      //     timeInForce: "day",
      //   },
      // });

      // console.log({
      //   id: buyOrder.id,
      //   status: buyOrder.status,
      //   notional: buyOrder.notional,
      // });

      console.log(state);
      // decidedStockPickTicker should be non null by this point
      // add details to database
      // TODO DEBUG uncomment this
      // updateStateHistoryDecision(
      //   image.lastModified,
      //   state,
      //   decision,
      //   imageFileName,
      //   decidedStockPickTicker,
      // );

      // TODO we need to send a sse to our next app to tell it to requery the the
      // state_history_table in db as we have a new update
      publishDataUpdate({ type: "state-history-updated" });

      return new Response("Status update succeeded", {
        status: 200,
        statusText: "OK",
      });
    }
    case SlimeMouldState.SLIME_MOULD_GENERIC_ERROR:
      return new Response("Status update succeeded", {
        status: 200,
        statusText: "OK",
      });
    default:
      return new Response("Status was not supplied or invalid.", {
        status: 400,
        statusText: "Bad Request",
      });
  }
}

// used by client components to fetch after sse message triggered
// by above method updating the state history
export async function GET(request: NextRequest) {
  const stateHistory: {
    timestampMS: Date;
    state: SlimeMouldState;
    stockTicker: string | null;
    imagePath: string | null;
  }[] = await getAllStateHistory();

  return Response.json(stateHistory);
}
