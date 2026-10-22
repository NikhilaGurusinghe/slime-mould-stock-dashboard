import SlimeMouldDecision from "@/app/lib/slime-mould-decision";
import SlimeMouldState from "@/app/lib/slime-mould-state";
import { randomUUID } from "crypto";
import { mkdir, writeFileSync } from "fs";
import { NextRequest } from "next/server";
import path from "path";
import z from "zod";
import { zfd } from "zod-form-data";

const schemaDefault = zfd.formData({
  state: zfd.text(z.enum(SlimeMouldState)),
});

const schemaDecision = zfd.formData({
  state: zfd.text(z.literal(SlimeMouldState.SLIME_MOULD_DECISION)),
  decision: zfd.text(z.enum(SlimeMouldDecision)),
  image: zfd.file(),
});

const imageDirectory: string = "/slimeMouldStockDashboard/petriDishImages";

const stateFormDataKey: string = "state";

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

      // take image hash + timestamp (from image name) to get random number

      // save image to disk with appropriate file name
      // use the last modified time here instead of the transmitted time (which is currently what image.name's
      // first part has)
      console.log(
        `${imageDirectory}/${image.lastModified}_${image.name.split("_")[1]}`,
      );
      const imageStorageDirectory: string = path.join(process.cwd(), imageDirectory);
      mkdir(imageStorageDirectory, { recursive: true }, (err) => {
        // TODO better error handling here
        if (err) throw err;
      });
      // console.log(uploadDirectory.toString());
      const imageFileLocation: string = path.join(imageStorageDirectory, `/${image.lastModified}_${randomUUID()}.jpg`);
      writeFileSync(imageFileLocation, Buffer.from(await image.arrayBuffer()));

      // add details to database

      console.log(decision, image);

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
