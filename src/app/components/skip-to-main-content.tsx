"use client";

import Link from "next/link";
import type React from "react";

export default function SkipToMainContent(props: { mainContentId: string }) {
  // Move focus to the main content of the page without changing the URL to
  // have an anchor
  const handleScrollToMainContent = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const mainContentElement = document.getElementById(props.mainContentId);
    if (mainContentElement) {
      mainContentElement.focus();
    }
  };

  return (
    <Link
      href={`#${props.mainContentId}`}
      aria-hidden={false}
      className="sr-only left-1/2 top-[12.5px] z-50 -translate-x-1/2 rounded-md bg-(--color-background) text-center align-middle focus:not-sr-only focus:absolute focus:p-3 focus:text-center focus:align-middle"
      tabIndex={0}
      onClick={handleScrollToMainContent}
    >
      Skip to main content
    </Link>
  );
}
