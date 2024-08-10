import "./globals.css";
import type { Metadata } from "next";
import { Ubuntu_Mono as FontSans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const fontSans = FontSans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Finance",
  description: "Generated & Create by NethMesaboth",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en">
        <body className={fontSans.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
