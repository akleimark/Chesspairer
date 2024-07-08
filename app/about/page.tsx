
import Navbar from "../components/Navbar";
import { getCookies } from 'next-client-cookies/server';
import { redirect } from "next/navigation";

const About = () => 
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
        <h1 className="text-3xl font-bold underline">about</h1>
        <p>
          This application is about pairing chess tournaments.
        </p>
      </div>
    </>
  );
}

export default About
  