"use client"
import { useState, useEffect } from 'react'
import { searchAction } from '../lib/actions'; 

export function TournamentplayersSearchbar({onDataFromChild} : any)
{   
    const [players, setPlayers] = useState('');

    async function sendDataToParent (formData : FormData)
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
    }, [players, onDataFromChild])             
    
    return (
        <div>
            <form action={sendDataToParent}>
                <input className="p-2 mr-2 text-slate-500" type="text" placeholder="Firstname" name="firstname" />
                <input className="p-2 mx-2 text-slate-500" type="text" placeholder="Lastname" name="lastname" /> 
                <input id="search" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Search" />
            </form>
        </div>
    )
}

