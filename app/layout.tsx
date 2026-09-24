import type { Metadata } from "next";
import "./globals.css";
import StartupLoader from "./StartupLoader";

export const metadata: Metadata = {
  title: "Shoply",
  description: "Shop smart. Live better.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <StartupLoader />
        {children}
      </body>
    </html>
  );
}