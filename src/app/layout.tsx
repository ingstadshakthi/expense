import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "../components/providers/theme-provider";
import { Header } from "../components/layout/header";
import { AlertDialogProvider } from "@/components/providers/alert-dialog";
import { LoaderProvider } from "@/components/providers/loader-provider";
import { Toaster } from "sonner";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Expensa — Smart Expense Tracking",
    template: "%s | Expensa",
  },
  description:
    "Expensa helps you track, categorize, and analyze your daily expenses with insightful charts and smart recommendations.",

  keywords: [
    "expense tracker",
    "budget management",
    "personal finance",
    "money tracking",
    "Expensa",
  ],

  authors: [{ name: "Expensa Team", url: "https://www.expensa.in/" }],
  creator: "Expensa",
  publisher: "Expensa",

  metadataBase: new URL("https://www.expensa.in/"),

  openGraph: {
    title: "Expensa — Smart Expense Tracking",
    description:
      "Track your expenses smartly and efficiently with Expensa. Simple UI, insightful charts, and smart budgeting tools.",
    url: "https://www.expensa.in/",
    siteName: "Expensa",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.expensa.in/logo.png",
        width: 1200,
        height: 630,
        alt: "Expensa — Smart Expense Tracking App",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@ExpensaApp",
    creator: "@ExpensaApp",
    title: "Expensa — Smart Expense Tracking",
    description: "Track, categorize, and analyze your expenses with Expensa.",
    images: ["https://www.expensa.in/twitter-image.png"],
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
    canonical: "https://www.expensa.in/",
  },

  category: "Finance",
  applicationName: "Expensa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
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
              <main className="mx-auto max-w-7xl px-4 xl:px-0">{children}</main>
            </AlertDialogProvider>
          </LoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
