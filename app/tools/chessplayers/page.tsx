
import Button from "@/app/components/Button";
import {redirect} from 'next/navigation'
import Navbar from "@/app/components/Navbar";
import { getCookies } from 'next-client-cookies/server';
import Link from "next/link";

async function getAllChessplayers()
{
  "use server"
  const response = fetch("http://localhost:3000/api/chessplayers", { cache: "no-store" });
  return ((await response).json());
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
            </tr>
          </thead>
          <tbody>
          {chessplayerContainer.length > 0 &&
              chessplayerContainer.map((chessplayer:any) => (
                <tr key={chessplayer.fideid}>
                  <td>{chessplayer.fideid}</td>
                  <td>{chessplayer.firstname}</td>
                  <td>{chessplayer.lastname}</td>
                  <td>{chessplayer.birthyear}</td>
                  <td>{chessplayer.chessclub}</td>
                </tr>
              ))}              
          </tbody>
        </table>

        <div className="buttonPanel">
          <Link href='/tools/chessplayers/add'>
            <Button
              id="addChessplayer"
              text="Add a chessplayer"            
            />
          </Link>
        </div>        

      </div>
    </>
  );
};


