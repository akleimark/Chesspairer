import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css"
import "./reset.css"
import Navbar from "./components/Navbar";
import Logout from "./components/Logout";
import { cookies } from "next/headers";
import { CookiesProvider } from 'next-client-cookies/server';
import Footer from "./components/Footer";
const lato = Lato({subsets: ["latin"], weight:'700'});

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
      <html lang="en" className={lato.className}>
        <body className="text-white h-full overflow-hidden bg-neutral-800">                                 
        { isLoggedIn &&
          <>
          <Navbar />
          <Logout />
          </>
        }                    
          <div className="wrapper px-6 h-full -mt-4 relative">
          <CookiesProvider>
            {children}             
          </CookiesProvider>              
          </div>
          <Footer />
        </body>
      </html>
  );
}
