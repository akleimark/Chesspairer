"use client"
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { TournamentRoundResult } from "@/app/lib/definitions";

export default function PairingPage()
{

  const selectedTournament = useCookies().get("selected_tournament");
  const [tournamentRoundResult, setTournamentRoundResults] = useState<Array<TournamentRoundResult>>();
  


  
    
    return (
    <>            
      <h1 className="text-3xl font-bold underline small-caps text-center my-8">pairing</h1> 
      <div className="mx-auto my-10 p-4 relative bg-neutral-700 h-4/6">        
        <div className="h-5/6 overflow-y-auto">
        

        </div>        
      </div>
    </>
  );
};
