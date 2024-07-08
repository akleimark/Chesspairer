
import React from "react";
import Link from "next/link";
import { getCookies } from 'next-client-cookies/server';
import { redirect } from "next/navigation";
import Logo from "./Logo";
const Navbar = () => 
{
  return (
    <>
      <nav>
        <Logo />
        <label  className="toggle">Menu</label>
        <input type="checkbox" id="drop" />
            <ul className="menu">
                <li><a href="/">Home</a></li>
                <li>                    
                    <label  className="toggle">Tools</label>
                    <Link href="#">Tools</Link>
                    <input type="checkbox" id="drop-1"/>
                    <ul>
                        <li><Link href="/tools/chessplayers">Chessplayers</Link></li>                        
                    </ul> 
                </li>                
                <li><Link href="/about">About</Link></li>                
                <li><button id="logout">Logout</button></li>
            </ul>            
        </nav>  
    </>
  );
};

export default Navbar;