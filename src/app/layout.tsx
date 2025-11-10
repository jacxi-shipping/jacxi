import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { Providers } from "@/components/providers/Providers";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JACXI Shipping - Vehicle Shipping from USA to Afghanistan & Middle East",
  description: "Professional, secure, and affordable vehicle transportation services from USA to Afghanistan and Middle East. Door-to-door shipping, container shipping, and full insurance coverage.",
  keywords: "vehicle shipping, car shipping, USA to Afghanistan, Middle East shipping, container shipping, door to door shipping",
  authors: [{ name: "JACXI Shipping" }],
  creator: "JACXI Shipping",
  publisher: "JACXI Shipping",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jacxi.com"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "dr-AF": "/dr",
      "ps-AF": "/ps",
    },
  },
  openGraph: {
    title: "JACXI Shipping - Vehicle Shipping from USA to Afghanistan & Middle East",
    description: "Professional, secure, and affordable vehicle transportation services from USA to Afghanistan and Middle East.",
    url: "https://jacxi.com",
    siteName: "JACXI Shipping",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JACXI Shipping - Vehicle Transportation Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JACXI Shipping - Vehicle Shipping from USA to Afghanistan & Middle East",
    description: "Professional, secure, and affordable vehicle transportation services from USA to Afghanistan and Middle East.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cairo.variable} dark`} dir="auto">
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <ConditionalLayout>
              {children}
            </ConditionalLayout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
