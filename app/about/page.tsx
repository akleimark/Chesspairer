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
        <div className="h-4/6 relative">
                <p className="p-2 text-lg text-center">
                  This application is about pairing chess tournaments.
                </p>
                <Image className='my-4 mx-auto rounded-md relative' src={chessImage} alt="Chess" fill
                style={{objectFit:"contain"}} />        
            </div>  
      </div>        
    </>
  );
}

export default About
  