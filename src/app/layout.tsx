import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bang Industries — Data Visualisation & Explanation Design",
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
        <Navigation />
        <main className="pt-14 md:pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
