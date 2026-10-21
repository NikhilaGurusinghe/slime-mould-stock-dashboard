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
        "flex flex-col gap-y-2 transition-all border border-transparent transition-discrete",
        !props.isOpen &&
          "hover:px-3 hover:-ml-3 hover:py-3 hover:-mt-3 hover:border-white/10 hover:bg-(--color-highlight)/30 hover:backdrop-blur-md rounded-3xl",
        props.isOpen &&
          "flex-2 px-3 -ml-3 py-3 -mt-3 border-white/10 bg-(--color-highlight)/30 border backdrop-blur-md rounded-2xl",
      )}
    >
      <button
        type="button"
        className="flex flex-row flex-wrap text-5xl md:text-7xl items-baseline justify-baseline font-medium cursor-pointer rounded-2xl border-transparent border"
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
        <>
          <div className="flex flex-col items-center justify-center w-full h-70 border border-white overflow-y-auto">
            pie chart
          </div>
          <div className="w-full flex-1 min-h-0 overflow-y-auto overscroll-contain scrollbar-track-transparent scrollbar-thumb-white">
            <div className="flex min-h-full flex-col-reverse justify-end pr-5">
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
              <div>1</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
