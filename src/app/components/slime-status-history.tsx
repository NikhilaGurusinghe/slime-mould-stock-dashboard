"use client";

import clsx from "clsx";
import { useState } from "react";
import HistorySection from "./history-section";
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
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
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
    <div
      className={clsx(
        props.isOpen
          ? "bg-(--color-highlight)/30 border-white/10 flex-1 h-full min-h-0"
          : "bg-white/5 border-white/10 hover:bg-(--color-highlight)/30 ",
        "relative flex flex-col md:text-lg px-5 py-2 md:-ml-3 max-w-full md:max-w-1/2 items-start justify-end transition-all border border-transparent rounded-2xl",
      )}
    >
      {props.isOpen && (
        <div className="flex h-full flex-col justify-end overflow-y-scroll min-h-0 scrollbar-thin">
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
          <HistorySection />
       
     
        </div>
      )}

      <span
        key={prevSlimeStatus.date}
        className="absolute cursor-pointer flex flex-row gap-x-3 items-center w-full justify-end animate-rotateX-out"
      >
        <h1 className="sr-only">previous status</h1>
        <div
          className={
            "inset-shadow-sm/80 rounded-full size-4 animate-radiate aspect-square"
          }
          style={{ backgroundColor: prevSlimeStatus.statusColour }}
        />
        <TextMarquee marqueeText={prevSlimeStatus.status} />
      </span>
      <button
        type="button"
        onClick={() => props.setIsOpen(!props.isOpen)}
        key={lastSlimeStatus.date}
        className="cursor-pointer flex flex-row gap-x-3 items-center w-full justify-start animate-rotateX-in [animation-delay:calc(var(--rotateX-duration)/8)]"
      >
        <span className="sr-only">view physarum history</span>
        <h1 className="sr-only">current status</h1>
        <div
          className={
            "inset-shadow-sm/80 rounded-full size-4 animate-radiate aspect-square"
          }
          style={{ backgroundColor: lastSlimeStatus.statusColour }}
        />
        <TextMarquee marqueeText={lastSlimeStatus.status} />
      </button>
    </div>
  );
}
