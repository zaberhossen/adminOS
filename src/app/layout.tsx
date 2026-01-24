import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StudyOS - Next.js with Tailwind",
  description: "A Next.js application with Tailwind CSS and TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
