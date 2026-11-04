import type { SlimeStatusAndHistory } from "./slime-status-history";
import { dateDiffInDays } from "./utils/date-diff";

// TODO display images here, something to do later

export default function HistorySection(props: {
  status: SlimeStatusAndHistory;
}) {
  return (
    <div className="flex flex-row w-full shrink-0 gap-x-4">
      <div className="relative flex flex-col items-center justify-center">
        <div className="w-0.75 h-full bg-white ml-1.5" />
        <div
          className="absolute size-4 inset-shadow-2xs/50 shadow-sm/0 rounded-full top-1/2 -translate-y-1/2 left-0"
          style={{ backgroundColor: props.status.statusColour }}
        />
      </div>
      <div className="relative flex flex-col items-start justify-start py-5">
        <h3 className="font-light text-sm">
          {dateDiffInDays(props.status.date, new Date())} days ago
        </h3>
        <h2 className="leading-tight font-medium text-lg">
          {props.status.message}
        </h2>
        <h3>{props.status.messageDetails}</h3>
      </div>
    </div>
  );
}
