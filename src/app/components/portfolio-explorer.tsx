"use client";

import clsx from "clsx";
import { useState } from "react";
import ThreeBarsIcon from "./icon/3-bars-icon";
import ArrowDownRightIcon from "./icon/arrow-down-right-icon";
import EllipsesVerticalIcon from "./icon/ellipses-vertical-icon";

export default function PortfolioExplorer(props: { balance: number, profitAndLoss: number }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "flex flex-col gap-y-2 transition-all border border-transparent transition-discrete rounded-4xl",
        !isOpen &&
          "hover:px-5 hover:-ml-5 hover:py-3 hover:-mt-3 hover:border-(--color-highlight-border)/20 hover:bg-(--color-highlight)/30 hover:backdrop-blur-md",
        isOpen &&
          "px-5 -ml-5 py-3 -mt-3 border-(--color-highlight-border)/20 bg-(--color-highlight)/30 border backdrop-blur-md",
      )} 
    >
      <button
        type="button"
        className="flex flex-row pl-5 -ml-5 pt-3 -mt-3 text-7xl items-baseline justify-baseline font-medium cursor-pointer rounded-4xl border-transparent border"
        onClick={() => setIsOpen((prevValue) => !prevValue)}
      >
        <span className="sr-only">view all portfolio assets</span>
        <span className="font-stretch-103%">$</span>
        <span className="font-stretch-110%">{props.balance}</span>
        <span className="text-3xl ml-4 font-normal font-stretch-103%">(</span>
        <span className="text-2xl font-normal font-stretch-103%">{props.profitAndLoss < 0 ? "-" : "+"}$</span>
        <span className="text-2xl font-normal font-stretch-110%">{Math.abs(props.profitAndLoss)}</span>
        <span className="text-3xl font-normal font-stretch-103%">)</span>
      
      </button>
      {isOpen && (
        <div className="flex flex-col items-center justify-center w-full h-70 border border-white">
          pie chart
        </div>
      )}
    </div>
  );
}
