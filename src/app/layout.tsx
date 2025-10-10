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
  title: {
    default: "ExpenseWise — Smart Expense Tracking",
    template: "%s | ExpenseWise",
  },
  description:
    "ExpenseWise helps you track, categorize, and analyze your daily expenses with insightful charts and smart recommendations.",

  keywords: [
    "expense tracker",
    "budget management",
    "personal finance",
    "money tracking",
    "ExpenseWise",
  ],

  authors: [{ name: "ExpenseWise Team", url: "https://expensewise.in" }],
  creator: "ExpenseWise",
  publisher: "ExpenseWise",

  metadataBase: new URL("https://expensewise.in"),

  openGraph: {
    title: "ExpenseWise — Smart Expense Tracking",
    description:
      "Track your expenses smartly and efficiently with ExpenseWise. Simple UI, insightful charts, and smart budgeting tools.",
    url: "https://expensewise.in",
    siteName: "ExpenseWise",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://expensewise.app/logo.png",
        width: 1200,
        height: 630,
        alt: "ExpenseWise App — Track your expenses smartly",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@ExpenseWiseApp",
    creator: "@ExpenseWiseApp",
    title: "ExpenseWise — Smart Expense Tracking",
    description: "Track, categorize, and analyze your expenses with ExpenseWise.",
    images: ["https://expensewise.app/twitter-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://expensewise.in",
  },

  category: "Finance",
  applicationName: "ExpenseWise",
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
