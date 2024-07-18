import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css"
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import { cookies } from "next/headers";

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
  const isLoggedIn = cookies().get('user-email');

  return (
      <html lang="en">
        <body className={openSand.className}>                                 
        { isLoggedIn &&
          <>
          <Navbar />
          <Logout />
          </>
        }
          
          
          <div className="wrapper">
            {children}                   
          </div>
        </body>
      </html>
  );
}
