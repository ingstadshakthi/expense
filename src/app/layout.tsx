import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "../components/providers/theme-provider";
import { Header } from "../components/layout/header";
import { AlertDialogProvider } from "@/components/providers/alert-dialog";
import { LoaderProvider } from "@/components/providers/loader-provider";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense",
  description: "App to store and Analyse Daily Expense",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <Toaster position="top-right" richColors closeButton />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoaderProvider>
            <AlertDialogProvider>
              <Header />
              <main className="mx-auto max-w-7xl px-4 xl:px-0">
                {children}
                <SpeedInsights />
              </main>
            </AlertDialogProvider>
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
