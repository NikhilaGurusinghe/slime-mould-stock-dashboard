import type { Metadata } from "next";
import "./globals.css";

import localFont from "next/font/local";

const ABCSchengenA = localFont({
  src: [
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-ThinItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-Light.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-LightItalic.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-Regular.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-RegularItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-Book.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-BookItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-SemiBold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-SemiBoldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-HeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-Ultra.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../fonts/Schengen/ABCSchengenA/ABCSchengenATrial-UltraItalic.otf",
      weight: "900",
      style: "italic",
    },
  ],
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
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for your Physarum portfolio",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className={`${ABCSchengenA.className} h-full w-full flex flex-col`}>
        {children}
      </body>
    </html>
  );
}
