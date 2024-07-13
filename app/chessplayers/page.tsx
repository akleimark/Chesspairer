
import {redirect} from 'next/navigation'
import Navbar from "@/app/components/Navbar";
import { getCookies } from 'next-client-cookies/server';
import Link from "next/link";

async function getAllChessplayers()
{
  "use server"
  try
  {
    const response = fetch("http://localhost:3000/api/chessplayers", { cache: "no-store" });
    return ((await response).json());
  }
  catch(error)
  {
    
  }
  
}

export default async function Chessplayers() 
{
  const cookies = getCookies();
  if (cookies.get("user-email") == undefined) 
  {
    redirect("/login");
  }

  let chessplayerContainer = await getAllChessplayers();
  chessplayerContainer = chessplayerContainer.chessplayers.rows;

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1 className="text-3xl font-bold underline">chessplayers</h1>
        <table className="fancyTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Birthyear</th>
              <th>Chessclub</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {chessplayerContainer.length > 0 &&
              chessplayerContainer.map((chessplayer:any) => (
                <tr key={chessplayer.ssfid}>
                  <td>{chessplayer.ssfid}</td>
                  <td>{chessplayer.firstname}</td>
                  <td>{chessplayer.lastname}</td>
                  <td>{chessplayer.birthyear}</td>
                  <td>{chessplayer.chessclub}</td>
                  <td><Link href={`/chessplayers/edit/${chessplayer.ssfid}`}>Edit</Link></td>
                </tr>
              ))}              
          </tbody>
        </table>

        <div className="buttonPanel">
          <Link href='/chessplayers/add'>
            <button
              id="addChessplayer">Add a chessplayer</button>                          
          </Link>
        </div>        

      </div>
    </>
  );
};


