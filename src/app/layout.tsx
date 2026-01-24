import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "StudyOS - Product Analytics & More",
  description: "The all-in-one platform for building better products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
