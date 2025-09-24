import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nanaslab Planner",
  description: "AI-powered content planner for UMKM",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-right" richColors closeButton />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
