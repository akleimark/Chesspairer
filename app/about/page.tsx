"use client"
import Navbar from "../components/navbar";
import { useCookies } from "next-client-cookies";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const About = () => 
{
  const cookies = useCookies();

  useEffect(() => 
  {
    if (cookies.get("user-email") == undefined) 
    {
      redirect("/login");
    }

  }, [cookies]);
  
  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1 className="text-3xl font-bold underline">about</h1>
        <p>
          This application is about pairing chess tournaments.
        </p>
      </div>
    </>
  );
}

export default About
  