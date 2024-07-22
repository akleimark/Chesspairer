"use client"
import { useState, useEffect } from 'react'
import { searchAction } from '../lib/actions'; 
import { Chessplayer } from '../lib/definitions';

export function TournamentplayersSearchbar({onDataFromChild} : any)
{   
    const [players, setPlayers] = useState<Array<Chessplayer>>([])

    async function sendDataToParent (formData: FormData)
    {         
        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const {result} : any = await searchAction(firstname, lastname); 
        setPlayers(result.rows);
        onDataFromChild(players);      
    }     
    useEffect(() => 
    {
        onDataFromChild(players); 
    },)             
    
    return (
        <div>
            <form action={sendDataToParent}>
                <input className="p-2 mr-2 text-slate-500" type="text" placeholder="Firstname" name="firstname" />
                <input className="p-2 mx-2 text-slate-500" type="text" placeholder="Lastname" name="lastname" /> 
                <input id="search" className="border-solid border-2 border-white-600 bg-lime-900 hover:bg-lime-800 text-white font-bold py-2 px-4 focus:outline-none focus:shadow-outline" type="submit" value="Search" />
            </form>
        </div>
    )
}

