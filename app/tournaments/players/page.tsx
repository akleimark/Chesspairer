'use client'
import { Tournamentplayer, Chessplayer, Tournament } from "@/app/lib/definitions";
import { AddIcon, BackIcon, DeleteIcon } from "@/app/components/IconComponents";
import { useEffect, useState } from "react";
import { useCookies } from 'next-client-cookies';
import Link from "next/link";
import {addTournamentplayerAction, removeTournamentplayerAction} from "@/app/lib/actions";
import {TournamentplayersSearchbar} from "@/app/components/Searchbars"

export default function TournamentPlayersPage()
{
    const cookieValue = useCookies().get('selected_tournament');
    let tournamentId : number = -1; 
    if(cookieValue != undefined)
    {
        tournamentId = parseInt(cookieValue);
    }
    const [tournament, setTournament] = useState<Tournament>();
    const [chessplayers, setChessplayers] = useState<Array<Chessplayer>>([]);
    
    function handleDataFromChild(data : Array<Chessplayer>)
    {
        setChessplayers(data);               
    }

    async function removeTournamentplayer(event : any, playerId : number)
    {
        await removeTournamentplayerAction(tournamentId, playerId);     
        getTournamentplayers();     
        getAvailablePlayers();    
        document.getElementById("search")?.click();
    }

    async function addTournamentplayer(event: any, playerId : number)
    {
        await addTournamentplayerAction(tournamentId, playerId);     
        getTournamentplayers();   
        getAvailablePlayers();
        document.getElementById("search")?.click();           
    }

    async function getTournamentplayers()
    {
        fetch(`http://localhost:3000/api/tournament/${tournamentId}`, { cache: "no-store" })
        .then((res) => res.json())
        .then(({tournament}) => {          
            setTournament(tournament);           
        });
    }

    async function getAvailablePlayers()
    {
        fetch(`http://localhost:3000/api/tournament/${tournamentId}/available-players`, { cache: "no-store" })
        .then((res) => res.json())
        .then(({chessplayers}) => {                      
            setChessplayers(chessplayers.rows);            
        });
    }

    useEffect(() => 
    {
        fetch(`http://localhost:3000/api/tournament/${tournamentId}`, { cache: "no-store" })
        .then((res) => res.json())
        .then(({tournament}) => {          
            setTournament(tournament);           
        });
    }, [tournamentId]);

    useEffect(() => 
    {
        fetch(`http://localhost:3000/api/tournament/${tournamentId}/available-players`, { cache: "no-store" })
        .then((res) => res.json())
        .then(({chessplayers}) => {                      
            setChessplayers(chessplayers.rows);            
        });
    }, [tournamentId]);

    function showAvailablePlayers()
    {
        return (
            <table className="fancyTable">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>Add</th>                   
                </tr>
            </thead>
            <tbody>            
            { chessplayers && chessplayers.map &&
                chessplayers.map((chessplayer:Chessplayer) => (
                    <tr key={chessplayer.ssf_id}>
                        <td>{chessplayer.ssf_id}</td>
                        <td>{chessplayer.firstname}</td>
                        <td>{chessplayer.lastname}</td>
                        <td onClick={(event) => addTournamentplayer(event, chessplayer.ssf_id)}><AddIcon alt="add" height={20} /></td>                    
                    </tr>
                ))}     
            
            </tbody>
        </table>
        )        
    }
    document.getElementById("search")?.click();
    function showParticipants()
    {
        return (
            <table className="fancyTable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Firstname</th>
                        <th>Lastname</th>                         
                        <th>Remove</th>                  
                    </tr>
                </thead>
                <tbody>
                {
                    tournament?.players?.map((player : Tournamentplayer )=> (
                        <tr key={player.chessplayer_id}>
                            <td>{player.chessplayer_id}</td>
                            <td>{player.firstname}</td>
                            <td>{player.lastname}</td>                            
                            <td onClick={(event) => removeTournamentplayer(event, player.chessplayer_id)}><DeleteIcon alt="delete" height={20} /></td>
                        </tr>
                ))
                }
                </tbody>
            </table>
        )
    }

    return (
        <>
            <h1 className="text-3xl font-bold underline">tournament players</h1>
            <div className="mx-auto my-10 p-12 relative b-333 h-9-10"> 
                <Link href="/tournaments">
                    <BackIcon />
                </Link>               
                <div className="grid grid-cols-2 gap-1">
                    <div>
                        <h4 className="text-center font-bold">Available players</h4>
                       {showAvailablePlayers()}
                    </div>
                    <div>
                        <h4 className="text-center font-bold">Participants</h4>
                        {showParticipants()}
                        
                    </div>
                </div>
                <div className="searchbar">
                    <TournamentplayersSearchbar onDataFromChild={handleDataFromChild} />
                </div>
            </div>
        </>
    )
}