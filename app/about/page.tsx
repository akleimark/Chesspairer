import Image from "next/image";
import chessImage from "@/public/chess_about.jpg"
import { Lato } from "next/font/google";

const lato = Lato({subsets: ["latin"], weight:'400'});

const About = () => 
{
  return (
    <> 
      <div className={`${lato.className} h-full overflow-hidden`}>
        <h1 className="text-3xl font-bold underline small-caps text-center my-8">about</h1>
        <p className="text-center">
          This application is about pairing chess tournaments.
        </p>
        <Image className='my-4 mx-auto rounded-md' src={chessImage} alt="Chess" width={1100} height={800}/>
      </div>
    </>
  );
}

export default About
  