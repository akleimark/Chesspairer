"use client"
import Navbar from "./components/navbar";
import { redirect } from "next/navigation";
import { useCookies } from "next-client-cookies";
import HomeComponent from '@/app/components/HomeComponent'

export default function Home() 
{
  const cookies = useCookies();
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
