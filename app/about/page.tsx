
import Image from "next/image";
import chessImage from "@/public/chess_about.jpg"

const About = () => 
{
  return (
    <>      
      <h1 className="text-3xl font-bold underline">about</h1>
      <p>
        This application is about pairing chess tournaments.
      </p>
      <Image className='startPage rounded-md' src={chessImage} alt="Chess" width={1100} height={800}/>      
    </>
  );
}

export default About
  