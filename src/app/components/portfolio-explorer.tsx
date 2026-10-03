"use client";

import clsx from "clsx";

export default function PortfolioExplorer(props: {
  balance: number;
  profitAndLoss: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) {
  return (
    <div
      className={clsx(
        "flex flex-col gap-y-2 transition-all border border-transparent transition-discrete rounded-4xl",
        !props.isOpen &&
          "hover:px-5 hover:-ml-5 hover:py-3 hover:-mt-3 hover:border-(--color-highlight-border)/20 hover:bg-(--color-highlight)/30 hover:backdrop-blur-md",
        props.isOpen &&
          "px-5 -ml-5 py-3 -mt-3 border-(--color-highlight-border)/20 bg-(--color-highlight)/30 border backdrop-blur-md",
      )}
    >
      <button
        type="button"
        className="flex flex-row flex-wrap pl-5 -ml-5 pt-3 -mt-3 text-5xl md:text-7xl items-baseline justify-baseline font-medium cursor-pointer rounded-4xl border-transparent border"
        onClick={() => props.setIsOpen(!props.isOpen)}
      >
        <span className="sr-only">view all portfolio assets</span>
        <p className="mr-2 md:mr-3">
          <span className="font-stretch-103%">$</span>
          <span className="font-stretch-110%">{props.balance}</span>
        </p>
        <p className="-mt-4">
          <span className="text-2xl md:text-3xl font-normal font-stretch-103%">
            (
          </span>
          <span className="text-xl md:text-2xl font-normal font-stretch-103%">
            {props.profitAndLoss < 0 ? "-" : "+"}$
          </span>
          <span className="text-xl md:text-2xl font-normal font-stretch-110%">
            {Math.abs(props.profitAndLoss)}
          </span>
          <span className="text-2xl md:text-3xl font-normal font-stretch-103%">
            )
          </span>
        </p>
      </button>
      {props.isOpen && (
        <div className="flex flex-col items-center justify-center w-full h-70 border border-white overflow-y-auto">
          pie chart
        </div>
      )}
    </div>
  );
}
