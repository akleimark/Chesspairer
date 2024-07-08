
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";
import { getCookies } from 'next-client-cookies/server';

import HomeComponent from '@/app/components/HomeComponent'

export default function Home() 
{
  const cookies = getCookies();
  if (cookies.get("user-email") == undefined) 
  {
    redirect("/login");
  }
  
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
