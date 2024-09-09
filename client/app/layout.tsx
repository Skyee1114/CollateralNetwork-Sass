import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./_context/authcontext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Collateral Network - SaaS Platform",
  description: "Collateral Network is a next-generation peer-to-peer lending platform that enables anyone from around the world to borrow against their assets using blockchain technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className} custom-scrollbar`}>
        <AuthProvider>
          {children}
        </AuthProvider>          
      </body>
    </html>
  );
}
