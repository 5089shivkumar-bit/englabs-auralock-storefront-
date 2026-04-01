import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { Suspense } from "react";
import FacebookPixel from "@/components/marketing/FacebookPixel";
import ChatBot from "@/components/ai/ChatBot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Englabs Lock | The Future of Autonomous Security",
  description: "Experience the next generation of architectural security. Englabs Lock combines biometric AI with military-grade hardware for a keyless, seamless existence.",
  keywords: ["smart lock", "biometric security", "autonomous access", "Englabs Lock", "AuraLock", "luxury hardware"],
  openGraph: {
    title: "Englabs Lock | High-Performance Security",
    description: "No Keys. No Guards. No Hassle.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Englabs Lock Security",
    description: "The gold standard in architectural biometric protection.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Englabs Lock Series 1",
    "image": "/product-hero.png",
    "description": "Biometric autonomous security system for smart homes and offices.",
    "brand": {
      "@type": "Brand",
      "name": "Englabs Lock"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}
