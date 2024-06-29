"use client"
import React from "react";
import Link from "next/link";
import { useCookies } from "next-client-cookies";
import { useRouter, redirect } from "next/navigation";


const Navbar = () => 
{
  const cookies = useCookies();
  const router = useRouter();

  const logout = (event : any) =>
  {
    cookies.remove('user-email');
    router.push('/login');
  }

  return (
    <>
      <nav>
        <div id="logo">Your Logo here</div>

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
                <li><button id="logout" onClick={logout}>Logout</button></li>
            </ul>
            
        </nav>

        
        
            
          
    </>
  );
};

export default Navbar;