"use client"
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { TournamentRoundResult, Tournament } from "@/app/lib/definitions";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function PairingPage()
{
  const tournamentId = useCookies().get("selected_tournament");
  const [tournament, setTournament] = useState<Tournament>();
  const path = usePathname();
  const lastindex = path.lastIndexOf('/');
  const roundNumber = path.substring(lastindex + 1);
  const [tournamentRoundResult, setTournamentRoundResults] = useState<Array<TournamentRoundResult>>();
  
  useEffect(() => 
  {
      fetch(`http://localhost:3000/api/tournament/${tournamentId}/pairing/${roundNumber}`, {cache: "no-store"})
      .then((res) => res.json())
      .then(({ result }) => 
      {                                   
        setTournamentRoundResults(result);     
        
      }           
      )
      ;
  }, [roundNumber, tournamentId]);

  useEffect(() => 
  {
      fetch(`http://localhost:3000/api/tournament/${tournamentId}`, {cache: "no-store"})
      .then((res) => res.json())
      .then(({ tournament }) => 
      {
          setTournament(tournament);          
      });
  }, [tournamentId]);

  function renderRoundNumberPanel()
  {
    let content = [];
        if(tournament?.number_of_rounds != undefined)
        {
          for(let roundNumber = 1; roundNumber <= tournament?.number_of_rounds; roundNumber++)
            {
                 content.push(<Link key={roundNumber} href={`/tournaments/pairing/${roundNumber}`}>
                  <button className='p-2 mr-1 rounded-md border-solid border-2 border-white-600'>                    
                      {roundNumber}
                  </button>
              </Link>)
            }
        }        
        return (
           content            
        )
  }
    return (
    <>            
      <h1 className="text-3xl font-bold underline small-caps text-center my-8">pairing</h1> 
      <div className="mx-auto my-10 p-4 relative bg-neutral-700 h-4/6">        
        <div className="h-5/6 overflow-y-auto">
        <table className="text-center mt-2 mb-auto w-full">
          <caption className="py-8">
            <div className="text-left italic text-sm">
              <label className="block">Tournament: {tournament?.name}</label>
              <label className="block">Round: {roundNumber}</label>            
            </div>
          </caption>
          <thead>            
            <tr className="border-solid border-2 border-white-600 bg-lime-900">              
              <th className="p-5 font-semibold">#</th>
              <th className="p-5 font-semibold">White</th>
              <th className="p-5 font-semibold">Black</th>
              <th className="p-5 font-semibold">Result</th>
            </tr>
          </thead>
          <tbody>
          {tournamentRoundResult?.map((result: TournamentRoundResult, index : number) => (
            <tr className="border-solid border-2 border-white-600" key={index}>
              <td className="opacity-80 p-1 bg-lime-900 align-middle">
                {index + 1}
              </td>
              <td className="opacity-80 p-1 bg-lime-900 align-middle">
                {result.white}
              </td>
              <td className="opacity-80 p-1 bg-lime-900 align-middle">
                {result.black}
              </td>
              <td className="opacity-80 p-1 bg-lime-900 align-middle">
                {result.result}
              </td>
            </tr>
          ))}  

          </tbody>
        </table>
        
          <div className="absolute bottom-4">
            {renderRoundNumberPanel()}
          </div> 

        </div>        
      </div>
    </>
  );
};
