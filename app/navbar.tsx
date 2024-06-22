import React from "react";
import Link from "next/link";


const Navbar = () => {
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
                        <li><a href="/tools/chessplayers">Chessplayers</a></li>
                        
                    </ul> 

                </li>
                
                <li><a href="/about">About</a></li>
            </ul>
        </nav>

        
        
            
          
    </>
  );
};

export default Navbar;