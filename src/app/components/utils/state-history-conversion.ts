import SlimeMouldState from "@/app/lib/slime-mould-state";
import z from "zod";

function getPresentationStringsFromState(
  slimeMouldState: SlimeMouldState,
  stockTicker: string | null,
): {
  status: string;
  statusColour: string;
  message: string;
  messageDetails: string;
} {
  switch (slimeMouldState) {
    case SlimeMouldState.SLIME_MOULD_REMOVED:
      return {
        status: "Slime mould not currently detected",
        statusColour: "#ff9f0a",
        message: "Slime mould was not detected",
        messageDetails:
          "This may be because the tray was removed. Alternatively, if you had just started a new slime mould it may take a day or two for the sensors to pick up growth.",
      };
    case SlimeMouldState.SLIME_MOULD_GROWING:
      return {
        status: "Slime mould is currently deciding",
        statusColour: "#30d058",
        message: "Slime mould was growing",
        messageDetails:
          "The slime mould was considering which decision to make.",
      };
    case SlimeMouldState.SLIME_MOULD_DECISION:
      return {
        status: "Slime mould has made a decision",
        statusColour: "#30d058",
        message: "The slime mould made a decision",
        messageDetails:
          stockTicker !== null
            ? `The slime mould made a decision and bought ${stockTicker}.`
            : "The slime mould made a decision and bought stock based on that decision.",
      };
    case SlimeMouldState.SLIME_MOULD_GENERIC_ERROR:
      return {
        status: "An error has occurred",
        statusColour: "#ff443b",
        message: "An error occurred",
        messageDetails: "An error occurred, but was resolved.",
      };
  }
}

export const stateHistoryConversionSchema = z
  .array(
    z.object({
      timestampMS: z.date(),
      state: z.enum(SlimeMouldState),
      stockTicker: z.string().nullable(),
      imagePath: z.string().nullable(),
    }),
  )
  .transform((rows) =>
    rows.map((row) => {
      const presentationStrings = getPresentationStringsFromState(
        row.state,
        row.stockTicker,
      );

      return {
        status: presentationStrings.status,
        statusColour: presentationStrings.statusColour,
        date: row.timestampMS,
        message: presentationStrings.message,
        messageDetails: presentationStrings.messageDetails,
        image: row.imagePath !== null ? row.imagePath : undefined,
      };
    }),
  );
