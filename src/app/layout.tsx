import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const GA_MEASUREMENT_ID = "G-7LEGLTTLM3";

export const metadata: Metadata = {
  title: "Bang Industries  - Data Visualisation & Explanation Design",
  description: "Design studio specialising in data visualisation, scientific illustration, and explanation design. We make complex ideas clear and visually extraordinary.",
  keywords: ["data visualisation", "explanation design", "scientific illustration", "infographics", "interactive design"],
  authors: [{ name: "Bang Industries" }],
  openGraph: {
    title: "Bang Industries",
    description: "Data Visualisation & Explanation Design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/qka5zju.css" />
      </head>
      <body className="antialiased">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Navigation />
        <main className="pt-14 md:pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
