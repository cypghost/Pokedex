import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import QueryClientProviderWrapper from "@/provider/QueryClientProviderWrapper";
import ThemeProviderWrapper from "@/provider/ThemeProviderWrapper";
import DarkModeToggle from "@/components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokédex App",
  description: "A modern Pokédex built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProviderWrapper>
          <QueryClientProviderWrapper>
            <DarkModeToggle />
            {children}
          </QueryClientProviderWrapper>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
