"use client";

import clsx from "clsx";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";

export default function Tabs(props: { tabButtonNames: string[] }) {
  const allButtonRefs: RefObject<HTMLButtonElement[]> = useRef<
    HTMLButtonElement[]
  >([]);

  const [highlightWidth, setHighlightWidth] = useState<number>(-1);
  const [highlightHeight, setHighlightHeight] = useState<number>(-1);
  const [highlightTranslateX, setHighlightTranslateX] = useState<number>(0);
  const [highlightTranslateY, setHighlightTranslateY] = useState<number>(0);
  const [currHighlightIndex, setCurrHighlightIndex] = useState<number>(0);

  function updateHighlight(refIndex: number) {
    if (
      allButtonRefs.current.length === 0 ||
      refIndex > allButtonRefs.current.length
    )
      return;
    const ref = allButtonRefs.current[refIndex];

    setHighlightWidth(ref.clientWidth);
    setHighlightHeight(ref.clientHeight);
    setHighlightTranslateX(ref.offsetLeft);
    setHighlightTranslateY(ref.offsetTop);
    setHighlightTranslateY(ref.offsetTop);
    setCurrHighlightIndex(refIndex);
    console.log(currHighlightIndex);
  }

  function updateHighlightCurrent() {
    updateHighlight(currHighlightIndex);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: need empty dependencies here
  useLayoutEffect(() => {
    updateHighlightCurrent();

    if (!window) return;

    window.addEventListener("resize", updateHighlightCurrent);

    return () => window.removeEventListener("resize", updateHighlightCurrent);
  }, [currHighlightIndex]);

  return (
    <div className="relative pointer-events-auto flex bg-white/5 border-white/10 rounded-2xl border px-px py-px md:-right-3 md:text-lg backdrop-blur-xs">
      <div
        className={clsx(
          highlightWidth !== -1 && highlightHeight !== -1
            ? "opacity-100"
            : "opacity-0",
          "absolute h-(--highlight-height) md:w-(--highlight-width) md:translate-x-(--highlight-translate-x) translate-y-(--highlight-translate-y) md:h-[calc(100%-2px)] w-[calc(100%-2px)] transition-all backdrop-blur-xs bg-(--color-highlight)/30 border border-(--color-highlight-border)/20 rounded-2xl",
        )}
        style={
          {
            "--highlight-height": `${highlightHeight}px`,
            "--highlight-width": `${highlightWidth}px`,
            "--highlight-translate-x": `${highlightTranslateX}px`,
            "--highlight-translate-y": `${highlightTranslateY}px`,
          } as React.CSSProperties
        }
      />
      <div
        role="tablist"
        className="flex flex-col md:flex-row relative justify-center items-center gap-y-3 md:gap-x-2"
      >
        {props.tabButtonNames.map((tabName, index) => (
          <button
            role="tab"
            key={tabName}
            ref={(element) => {
              if (!element) return;
              allButtonRefs.current[index] = element;
            }}
            type="button"
            className="cursor-pointer px-3 py-3 md:py-2 rounded-full w-full md:text-nowrap leading-4.5 md:leading-normal items-start"
            onClick={() => updateHighlight(index)}
            aria-selected={currHighlightIndex === index}
          >
            {tabName}
          </button>
        ))}
      </div>
    </div>
  );
}
