import { createSSEHandler } from "use-next-sse";
import { subscribeToDataUpdates } from "@/app/lib/observers/dashboard-data-update";

export const dynamic = "force-dynamic";

export const GET = createSSEHandler((send, close) => {
  return subscribeToDataUpdates((update) => {
    send(update, "dashboard-data-update");
  })
})