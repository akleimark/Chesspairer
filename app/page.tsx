
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";

import HomeComponent from '@/app/components/HomeComponent'

export default function Home() 
{

  
  
  return (
    <>
    <Navbar />
      <div className="wrapper">
        <h1 className="text-3xl font-bold underline">home</h1>
          <HomeComponent imageName='chess1.jpg' />
      </div>
      </>
  );
}
