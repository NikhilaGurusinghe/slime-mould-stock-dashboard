"use client";

import { useRef } from "react";

export default function Tabs() {
  const FLEX_X_GAP: number = 8; // in px

  const monthlyButtonRef = useRef<HTMLButtonElement>(null);
  const ytdButtonRef = useRef<HTMLButtonElement>(null);
  const maxButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative flex">
      <div className="top-0 absolute transition-all backdrop-blur-md bg-(--color-highlight)/30 border border-(--color-highlight-border)/20 h-full w-[80px] rounded-2xl"></div>
      <div
        className="flex flex-col md:flex-row relative justify-center items-center"
        style={{ columnGap: FLEX_X_GAP }}
      >
        <button
          ref={monthlyButtonRef}
          type="button"
          className="cursor-pointer px-3 py-2 rounded-full"
        >
          monthly
        </button>
        <button
          ref={ytdButtonRef}
          type="button"
          className="cursor-pointer px-3 py-2 rounded-full"
        >
          year to date
        </button>
        <button
          ref={maxButtonRef}
          type="button"
          className="cursor-pointer px-3 py-2 rounded-full"
        >
          max
        </button>
      </div>
    </div>
  );
}
