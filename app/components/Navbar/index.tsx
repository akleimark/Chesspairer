import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";
import logoutIcon from "@/public/logout-icon.png"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Navbar = () => 
{
  const componentType = typeof window === 'undefined' ? 'server' : 'client';
  console.log(componentType);
  return (
    <>
      <nav>
        <Logo />
            <ul>                
                <li>
                    <Link className="text-white opacity-70 hover:opacity-100 duration-300" href="/">
                      Home
                    </Link>
                </li>
                <li>
                    <Link className="text-white opacity-70 hover:opacity-100 duration-300" href="/tournaments">
                      Tournaments
                    </Link>
                </li>
                <li>
                    <Link className="text-white opacity-70 hover:opacity-100 duration-300" href="/chessplayers">
                      Chessplayers
                    </Link>
                </li>
                <li>
                    <Link className="text-white opacity-70 hover:opacity-100 duration-300" href="/about">
                      About
                    </Link>
                </li>                
            </ul>
        </nav>  
    </>
  );
};

export default Navbar;