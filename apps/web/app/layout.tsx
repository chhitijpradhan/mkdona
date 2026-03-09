import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-md",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Acme Inc. — Transform the way your team works",
  description:
    "Acme Platform brings your team together with powerful tools designed to streamline workflows, boost productivity, and drive results.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}