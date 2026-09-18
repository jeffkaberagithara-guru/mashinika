import type { Metadata, Viewport } from "next"
import "@/app/globals.css"

import { Geist, Geist_Mono } from "next/font/google"

import { siteConfig } from "@/config/site"
import { Providers } from "@/app/providers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  icons: {
    icon: [
      { url: "/brand/favicon.svg", sizes: "64x64", type: "image/svg+xml" },
      { url: "/brand/logo.svg", sizes: "320x80", type: "image/svg+xml" },
    ],
    apple: "/brand/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_KE",
    siteName: siteConfig.name,
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
}

export const viewport: Viewport = {
  themeColor: "#0B1220",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}