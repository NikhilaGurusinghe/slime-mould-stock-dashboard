"use client";

import useResizeObserver from "@react-hook/resize-observer";
import clsx from "clsx";
import { type RefObject, useLayoutEffect, useRef, useState } from "react";

type TextMarqueeProps = { marqueeText: string; className?: string };

// https://jackwhiting.co.uk/posts/creating-a-marquee-with-tailwind-css-v4
export default function TextMarquee({
  marqueeText,
  className,
}: TextMarqueeProps) {
  const textSpan: RefObject<HTMLSpanElement | null> =
    useRef<HTMLSpanElement>(null);
  const textGrandParentDiv: RefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const [needsMarquee, setNeedsMarquee] = useState<boolean>(false);
  // TODO might need to use memo this/parameterize this
  const checkNeedsMarquee = () => {
    const textSpanElement: HTMLSpanElement | null = textSpan.current;
    const textGrandParentDivElement: HTMLDivElement | null =
      textGrandParentDiv.current;
    if (!textSpanElement || !textGrandParentDivElement) return;

    console.log(
      textSpanElement.scrollWidth,
      textGrandParentDivElement.clientWidth,
      textSpanElement.scrollWidth > textGrandParentDivElement.clientWidth,
    );
    setNeedsMarquee(
      textSpanElement.scrollWidth > textGrandParentDivElement.clientWidth,
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: Does not need to rerender
  useLayoutEffect(() => {
    const textSpanElement: HTMLSpanElement | null = textSpan.current;
    const textGrandParentDivElement: HTMLDivElement | null =
      textGrandParentDiv.current;
    if (!textSpanElement || !textGrandParentDivElement) return;

    checkNeedsMarquee();

    const observer = new ResizeObserver(checkNeedsMarquee);

    observer.observe(textGrandParentDivElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={textGrandParentDiv}
      className={clsx(
        className,
        "relative w-full overflow-x-hidden group rounded-lg",
      )}
    >
      <div
        className={clsx(
          needsMarquee &&
            "animate-marquee group-hover:[animation-play-state:paused]",
          "flex flex-row w-max whitespace-nowrap gap-3 -mr-4",
        )}
      >
        <span ref={textSpan} className={clsx("mr-4")}>
          {marqueeText}
        </span>
      </div>
      {needsMarquee && (
        <div
          className="animate-marquee-reverse absolute top-0 group-hover:[animation-play-state:paused] flex flex-col w-max whitespace-nowrap"
          aria-hidden={true}
        >
          <span className={clsx("mr-4")}>{marqueeText}</span>
        </div>
      )}
    </div>
  );
}
