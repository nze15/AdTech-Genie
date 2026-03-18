import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AdTech Genie | AI Code Generation Platform",
  description: "AI-powered code generation and web development platform. Generate landing pages, portfolios, dashboards, and more with advanced AI assistance.",
  keywords: ["AI", "code generation", "web development", "landing page builder", "portfolio generator"],
  authors: [{ name: "AdTech Genie" }],
  creator: "AdTech Genie",
  publisher: "AdTech Genie",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://adtech-genie.vercel.app",
    title: "AdTech Genie | AI Code Generation Platform",
    description: "Generate professional websites with AI assistance",
    siteName: "AdTech Genie",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdTech Genie",
    description: "AI-powered code generation platform",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#10b981",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
