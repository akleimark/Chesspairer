import HomeComponent from '@/app/components/HomeComponent'
import { Lato } from "next/font/google";

const lato = Lato({subsets: ["latin"], weight:'400'});

export default function Home() 
{
  return (
    <>  
      <div className={`${lato.className} h-full overflow-hidden`}>
        <h1 className="text-3xl font-bold underline small-caps text-center my-8">home</h1>
            <HomeComponent imageName='chess1.jpg' />      
      </div>          
      </>
  );
}
