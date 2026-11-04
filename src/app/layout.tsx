import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";
import Navbar from "./components/navbar";
import SkipToMainContent from "./components/skip-to-main-content";
import { cn } from "@/app/lib/utils/utils";

const ABCSchengenVariable = localFont({
  src: "../fonts/Schengen/ABCSchengenVariable/ABCSchengenVariableTrial.ttf",
  variable: "--font-schengen-variable",
  weight: "100 200 300 400 500 700 800 900",
});

const ABCSchengenAMono = localFont({
  src: [
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-Light.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-LightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-Regular.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-RegularItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-BookItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-HeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-Ultra.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenAMono/ABCSchengenAMonoTrial-UltraItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-schengen-a-mono",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for your Physarum portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("h-full", "antialiased", "font-sans")}>
      <body
        className={`${ABCSchengenVariable.className} h-screen w-screen flex flex-col`}
      >
        <SkipToMainContent mainContentId="content" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
