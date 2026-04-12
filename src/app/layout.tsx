import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "QRField",
    template: "%s · QRField",
  },
  description: "QR codes that grow with your business — MVP in progress.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className={`${inter.variable} ${inter.className} h-full antialiased`}>
      <body className="min-h-dvh font-sans">
        <AppProviders session={session}>{children}</AppProviders>
      </body>
    </html>
  );
}
