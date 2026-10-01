"use client";

import clsx from "clsx";
import { useState } from "react";
import ArrowDownRightIcon from "./icon/arrow-down-right-icon";

export default function PortfolioExplorer(props: { balance: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "flex flex-col gap-y-2 transition-all border border-transparent",
        !isOpen && "hover:px-5 hover:-ml-5 hover:py-3 hover:-mt-3 hover:border-(--color-highlight-border)/20 hover:bg-(--color-highlight)/30 hover:backdrop-blur-md rounded-full",
        isOpen && "px-5 -ml-5 py-3 -mt-3 border-(--color-highlight-border)/20 bg-(--color-highlight)/30 hover:backdrop-blur-md rounded-4xl"
      )}
    >
      <button
        type="button"
        className="flex flex-row text-7xl items-end justify-baseline font-medium cursor-pointer rounded-full border-transparent border"
        onClick={() => setIsOpen((prevValue) => !prevValue)}
      >
        <span className="sr-only">view all portfolio assets</span>
        <span className="font-stretch-103%">$</span>
        <span className="font-stretch-110%">{props.balance}</span>
        <ArrowDownRightIcon
          className="ml-5 mr-1 mb-2.5"
          strokeWidth="15"
          size="size-10"
        />
      </button>
      {isOpen && (
        <div className="flex flex-col items-center justify-center w-full h-70 border border-white">
          pie chart
        </div>
      )}
    </div>
  );
}
