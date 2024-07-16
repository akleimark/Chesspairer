
import Navbar from "../components/Navbar";

import { Open_Sans } from "next/font/google";
import Image from "next/image";
import chessImage from "@/public/chess_about.jpg"

const openSand = Open_Sans({subsets: ["latin"]})

const About = () => 
{
  return (
    <>
      <Navbar />
      <div className={`wrapper ${openSand.className}`}>
        <h1 className="text-3xl font-bold underline">about</h1>
        <p>
          This application is about pairing chess tournaments.
        </p>
        <Image className='startPage rounded-md' src={chessImage} alt="Chess" width={1100} height={800}/>
      </div>
    </>
  );
}

export default About
  