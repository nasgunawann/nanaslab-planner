import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./Providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nanasgunung Content Planner",
  description:
    "Rencanakan, kelola, dan publikasikan konten Anda dengan mudah menggunakan Nanasgunung Content Planner. Alat sempurna untuk UMKM, kreator, dan tim marketing.",
  icons: {
    icon: "/favicon.ico", // bisa .ico, .png, atau .svg
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="scroll-smooth scroll-pt-20"
      suppressHydrationWarning
    >
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Toaster position="top-right" richColors closeButton />
          <Providers>{children}</Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
