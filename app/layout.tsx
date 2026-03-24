import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brijesh Munjiyasara | AI/ML Engineer & Data Scientist",
  description: "Portfolio of Brijesh Munjiyasara - MTech CSE student passionate about AI/ML, Deep Learning, NLP, Computer Vision, and Healthcare Data Science.",
  keywords: ["AI", "ML", "Data Science", "Deep Learning", "NLP", "Python", "Brijesh Munjiyasara"],
  authors: [{ name: "Brijesh Munjiyasara" }],
  openGraph: {
    title: "Brijesh Munjiyasara | AI/ML Engineer",
    description: "Transforming complex data into impactful AI/ML solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
