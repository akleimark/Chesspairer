import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";

import "./globals.css";
import { CookiesProvider } from 'next-client-cookies/server';
const inter = Inter({ subsets: ["latin"] });
const openSand = Open_Sans({subsets: ["latin"]})

export const metadata: Metadata = 
{
  title: "Chesspairer",
  description: "",
  authors: [{name : "Anders Kleimark"}]
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
      <html lang="en">
        <body className={openSand.className}>                         
          <CookiesProvider>
            {children}          
          </CookiesProvider>
        </body>
      </html>
  );
}
