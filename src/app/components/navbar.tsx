"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname: string = usePathname();
  const PORTFOLIO_PATHNAME: string = "/portfolio";

  const balance: number = 9123.34;

  return (
    <nav className="flex flex-row">
      <Link href="/" className="sr-only">
        Dashboard
      </Link>
    </nav>
  );
}
