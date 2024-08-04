"use client"
import Link from "next/link"
import { StartIcon, AddIcon, PlayersIcon, TableIcon, HomeIcon, PairingIcon } from "./IconComponents"
import { Tournament } from '../lib/definitions';
import { startTournamentAction } from "../lib/actions";
import { useCookies } from "next-client-cookies";
import { useState, useEffect } from "react";

export function TournamentButtonPanel()
{    
    const [tournament, setTournament] = useState<Tournament>();
    const cookieValue = useCookies().get("selected_tournament");
    useEffect(() => 
    {
        fetch(`http://localhost:3000/api/tournament/${cookieValue}`, {cache: "no-store"})
        .then((res) => res.json())
        .then(({ tournament }) => 
        {            
            setTournament(tournament);
        });
    }, [cookieValue]);
    
    const mayStartTournament = () =>
    {
        if(tournament?.results != undefined && tournament?.results?.length > 0)
        {
            return false;
        }
        
        if(tournament?.pairingsystem == "Round Robin")
        {
            if(tournament.players?.length && tournament.players?.length % 2 == 0)
            {
                if(tournament.players?.length == tournament.number_of_rounds + 1)
                {
                    return true;
                }
            }
            else if(tournament.players?.length && tournament.players?.length % 2 != 0)
            {
                if(tournament.players?.length == tournament.number_of_rounds )
                {
                    return true;
                }
            }                        
        }
        return false;
    }
    
    return (
        <>
        <div className="fixed bottom-14">
        <Link href='/tournaments/'>
            <button className='p-2 rounded-md border-solid border-2 border-white-600'>
                <HomeIcon />            
            </button>
          </Link>
          
          <Link href='/tournaments/add'>
            <button className='p-2 ml-1 rounded-md border-solid border-2 border-white-600' id="addTournament">
                <AddIcon alt="New tournament" />            
            </button>
          </Link>

          { tournament &&            
            <Link href='/tournaments/players'>
                <button className='p-2 ml-1 rounded-md border-solid border-2 border-white-600' id="manageTournamentPlayers">
                <PlayersIcon />      
            </button>
          </Link>
            }

        { mayStartTournament() && tournament != undefined &&             
                <button className='p-2 ml-1 rounded-md border-solid border-2 border-white-600'>
                    <StartIcon onClick={async () => {
                    await startTournamentAction(tournament)
            }} />
                </button>         
            }

        {
            tournament?.results && tournament.results.length > 0 &&

            <Link href='/tournaments/pairing/1'>
                <button className='p-2 ml-1 rounded-md border-solid border-2 border-white-600'>
                <PairingIcon />      
            </button>
          </Link>            
        }
        </div>   
        </>    
    )
}

export function ToolsButtonPanel()
{
    const renderTableIcons = () =>
    {
        let content = [];

        for(let players = 4; players <= 20; players+=2)
        {
             content.push(<TableIcon key={players} alt="Round Robin tables" numberOfPlayers={players} />)
        }

        return (
           content            
        )
    }

    return (
        <>
        <div className="fixed bottom-16">                           
            {renderTableIcons()}                     
        </div>   
        </>

    )
}