import Link from "next/link";
import { Chessplayer } from '../lib/definitions';
import { AddIcon, EditIcon } from "../components/IconComponents";
import { Lato } from "next/font/google";

const lato = Lato({subsets: ["latin"], weight:'400'});

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
    console.log(error);
  }
}

export default async function Chessplayers() 
{
  const chessplayerContainer : any = await getAllChessplayers();
  
  return (
    <>
    <div className={`${lato.className} h-full overflow-hidden`}>
      <h1 className="text-3xl font-bold underline small-caps text-center my-8">chessplayers</h1>
      <table className="text-center mt-2 mb-auto w-full">
        <thead>
          <tr className="border-solid border-2 border-white-600 bg-lime-900">
            <th className="p-5 font-semibold">#</th>
            <th className="p-5 font-semibold">Firstname</th>
            <th className="p-5 font-semibold">Lastname</th>
            <th className="p-5 font-semibold">Birthyear</th>
            <th className="p-5 font-semibold">Chessclub</th>
            <th className="p-5 font-semibold">Edit</th>
          </tr>
        </thead>
        <tbody>
        {chessplayerContainer &&
            chessplayerContainer?.chessplayers?.rows?.map((chessplayer:Chessplayer) => (
              <tr className="border-solid border-2 border-white-600" key={chessplayer.ssf_id}>
                <td className="opacity-80 p-1 bg-lime-900 align-middle">{chessplayer.ssf_id}</td>
                <td className="opacity-80 p-1 bg-lime-900 align-middle">{chessplayer.firstname}</td>
                <td className="opacity-80 p-1 bg-lime-900 align-middle">{chessplayer.lastname}</td>
                <td className="opacity-80 p-1 bg-lime-900 align-middle">{chessplayer.birthyear}</td>
                <td className="opacity-80 p-1 bg-lime-900 align-middle">{chessplayer.chessclub_id}</td>
                <td className="opacity-80 p-1 bg-lime-900 align-middle"><Link href={`/chessplayers/edit/${chessplayer.ssf_id}`}><EditIcon /></Link></td>
              </tr>
            ))}              
        </tbody>
      </table>

      <div className="buttonPanel">
        <Link href='/chessplayers/add'>
          <button
            className='p-2 rounded-md border-solid border-2 border-white-600' id="addChessplayer">
              <AddIcon alt="selected" />                
          </button>
        </Link>
      </div>
    </div>
    </>
  );
};
