
import Navbar from "@/app/components/Navbar";
import Link from "next/link";
import { Chessplayer } from '../lib/definitions';


async function getAllChessplayers()
{
  "use server"
  try
  {
    const response:any = await fetch("http://localhost:3000/api/chessplayers", { cache: "no-store" });
    return ((await response).json());
  }
  catch(error)
  {
    
  }
  
}

export default async function Chessplayers() 
{
  const chessplayerContainer : any = await getAllChessplayers();
  
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
          {chessplayerContainer &&
              chessplayerContainer.chessplayers.rows.map((chessplayer:Chessplayer) => (
                <tr key={chessplayer.ssf_id}>
                  <td>{chessplayer.ssf_id}</td>
                  <td>{chessplayer.firstname}</td>
                  <td>{chessplayer.lastname}</td>
                  <td>{chessplayer.birthyear}</td>
                  <td>{chessplayer.chessclub_id}</td>
                  <td><Link href={`/chessplayers/edit/${chessplayer.ssf_id}`}>Edit</Link></td>
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


