import Link from "next/link";
import Logo from "./Logo";
import { Arvo } from "next/font/google";

const font = Arvo({subsets: ["latin"], weight:'700', adjustFontFallback: false});

const Navbar = () => 
{
  return (
    <>
      <div className={font.className}>
      <nav className="m-0 p-0 bg-lime-900">
        <Logo />
            <ul className="float-right mr-16">                
                <li className="inline-block">
                    <Link className="py-4 px-5 block text-2xl text-white opacity-70 hover:opacity-100 duration-300" href="/">
                      Home
                    </Link>
                </li>
                <li className="inline-block">
                    <Link className="py-4 px-5 block text-2xl text-white opacity-70 hover:opacity-100 duration-300" href="/tournaments">
                      Tournaments
                    </Link>
                </li>
                <li className="inline-block">
                    <Link className="py-4 px-5 block text-2xl text-white opacity-70 hover:opacity-100 duration-300" href="/chessplayers">
                      Chessplayers
                    </Link>
                </li>
                <li className="inline-block">
                    <Link className="py-4 px-5 block text-2xl text-white opacity-70 hover:opacity-100 duration-300" href="/tools">
                      Tools
                    </Link>
                </li>
                <li className="inline-block">
                    <Link className="py-4 px-5 block text-2xl text-white opacity-70 hover:opacity-100 duration-300" href="/about">
                      About
                    </Link>
                </li>                
            </ul>
        </nav>  
        </div>
    </>
  );
};

export default Navbar;