"use client"
import { Tournament } from "../lib/definitions";
import Link from "next/link";
import { useCookies } from 'next-client-cookies';
import {AddIcon, EditIcon, SelectedIcon, PlayersIcon} from "@/app/components/IconComponents"
import { TournamentButtonPanel } from "../components/TournamentButtonPanel";
import { Lato } from "next/font/google";
import { useState, useEffect } from "react";
import {selectTournamentAction} from "@/app/lib/actions"
const lato = Lato({subsets: ["latin"], weight:'400'});

export default function TournamentPage()
{
  const renderSelectTournamentRow = (id : number | undefined) =>
  {
    let selectedTournamentNumber : number = -1;

    if( selectedTournament == undefined)
    {
      selectedTournamentNumber = -1;
    }
    else
    {
      selectedTournamentNumber = parseInt(selectedTournament);
    }
    
    return (
      <>
        {
          (selectedTournamentNumber == -1 || selectedTournamentNumber != id) && 
          <AddIcon alt="selected" onClick={async () => {
            await selectTournamentAction(id)}} />
        }     
        
        {
          (selectedTournamentNumber == id) &&             
            <SelectedIcon />       
        }
      </>
    )    
  }

  const userId = useCookies().get('user-email'); 
  const selectedTournament =  useCookies().get('selected_tournament'); 
  const [tournaments, setTournaments] = useState<Array<Tournament>>();

  useEffect(() => {fetch(`http://localhost:3000/api/tournaments/${userId}`, { cache: "no-store" })
  .then((res) => res.json())
  .then(({ tournaments }) => 
  {
      setTournaments(tournaments.rows);      
  });
  }, [userId]);

    return (
    <>      
      <div className={`${lato.className} h-full overflow-hidden`}>
        <h1 className="text-3xl font-bold underline small-caps text-center my-8">tournaments</h1>
        <div className="h-2/3 overflow-scroll">
          <table className="text-center mt-2 mb-auto w-full">
            <thead className="text-xl">
              <tr className="border-solid border-2 border-white-600 bg-lime-900">            
                <th className="p-5 font-semibold">Name</th>
                <th className="p-5 font-semibold">Pairingsystem</th>
                <th className="p-5 font-semibold">Number of rounds</th>
                <th className="p-5 font-semibold">Startdate</th>
                <th className="p-5 font-semibold">Enddate</th>
                <th className="p-5 font-semibold">Edit</th>
                <th className="p-5 font-semibold">Select</th>
              </tr>
            </thead>
            <tbody className="text-lg">          
              {tournaments?.map((tournament: Tournament) => (
                <tr className="border-solid border-2 border-white-600" key={tournament.id}>
                    <td className="opacity-80 p-1 bg-lime-900 align-middle">{tournament.name}</td>
                    <td className="opacity-80 p-1 bg-lime-900 align-middle">{tournament.pairingsystem}</td>
                    <td className="opacity-80 p-1 bg-lime-900 align-middle">{tournament.number_of_rounds}</td>
                    <td className="opacity-80 p-1 bg-lime-900 align-middle">{tournament.startdate}</td>
                    <td className="opacity-80 p-1 bg-lime-900 align-middle">{tournament.enddate}</td>
                    <td className="opacity-80 p-1 bg-lime-900 align-middle"><Link href={`/tournaments/edit/${tournament.id}`}><EditIcon /></Link></td>
                    <td className="opacity-80 p-1 bg-lime-900 align-middle">{renderSelectTournamentRow(tournament.id)}</td>
                </tr>               
              ))}                                                  
            </tbody>
          </table>
        </div>
        <TournamentButtonPanel userId={userId} selectedTournament={selectedTournament} />          
      </div>
    </>
  );
};
