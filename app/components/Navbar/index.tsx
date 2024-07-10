
import React from "react";
import Link from "next/link";
import Logo from "./Logo";
const Navbar = () => 
{
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