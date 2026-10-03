"use client";

import { useState } from "react";
import TextMarquee from "./text-marquee";

export type SlimeStatusAndHistory = {
  status: string;
  statusColour: string;
  date: number;
  message: string;
  subMessage: string;
  image: string;
  iconName: string;
};

export default function SlimeStatusHistory(props: {
  statuses: SlimeStatusAndHistory[];
}) {
  const [isClosed, setIsClosed] = useState<boolean>(false);

  const prevSlimeStatus: SlimeStatusAndHistory =
    props.statuses.length >= 2
      ? props.statuses[props.statuses.length - 2]
      : {
          status: "Physarum is initialising...",
          statusColour: "#ffab52",
          date: 0,
          message: "Physarum is initialising",
          subMessage: "is initialising",
          image: "test",
          iconName: "initialise",
        };
  const lastSlimeStatus: SlimeStatusAndHistory =
    props.statuses[props.statuses.length - 1];

  return (
    <div className="relative flex flex-col px-3 py-2 -ml-3 max-w-1/2 items-start justify-start transition-all bg-white/5 border-white/10 hover:bg-(--color-highlight)/30 border border-transparent hover:border-(--color-highlight-border)/20 rounded-2xl">
      {isClosed && (
        <div className="overflow-y-auto">
          asdsadssssssssssssssssssssssssssssssssssssssssssssssssss
        </div>
      )}
      <span
        key={prevSlimeStatus.date}
        className="absolute cursor-pointer flex flex-row gap-x-2 items-center w-full justify-start animate-rotateX-out"
      >
        <h1 className="sr-only">previous status</h1>
        <div
          className={"rounded-full size-3 animate-radiate"}
          style={{ backgroundColor: prevSlimeStatus.statusColour }}
        />
        <TextMarquee marqueeText={prevSlimeStatus.status} />
      </span>
      <button
        type="button"
        onClick={() => setIsClosed((prevValue) => !prevValue)}
        key={lastSlimeStatus.date}
        className="cursor-pointer flex flex-row gap-x-2 items-center w-full justify-start animate-rotateX-in [animation-delay:calc(var(--rotateX-duration)/8)]"
      >
        <span className="sr-only">view physarum history</span>
        <h1 className="sr-only">current status</h1>
        <div
          className={"rounded-full size-3 animate-radiate"}
          style={{ backgroundColor: lastSlimeStatus.statusColour }}
        />
        <TextMarquee marqueeText={lastSlimeStatus.status} />
      </button>
    </div>
  );
}
