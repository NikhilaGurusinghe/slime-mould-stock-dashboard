import { createSSEHandler } from "use-next-sse";
import {
  dashboardDataUpdateEventName,
  subscribeToDataUpdates,
} from "@/app/lib/observers/dashboard-data-update";

export const dynamic = "force-dynamic";

export const GET = createSSEHandler((send, close) => {
  return subscribeToDataUpdates((update) => {
    send(update, dashboardDataUpdateEventName);
  });
});
