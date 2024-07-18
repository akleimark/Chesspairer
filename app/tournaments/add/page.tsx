'use client'
import Navbar from "@/app/components/Navbar"
import {newTournamentAction} from '@/app/lib/actions'
import Link from "next/link";
import { Open_Sans } from "next/font/google";
import { useFormState } from 'react-dom'
import { BackIcon, SaveIcon } from "@/app/components/IconComponents";

const initialState = 
{
    message: '',
}

const AddTournament = () =>
{   
    const [state, formAction] = useFormState(newTournamentAction, initialState)

    function renderNumberOfRoundsOptions()
    {
        const options = [];
      
        for (let i = 2; i <= 16;i++) 
        {
          options.push(
            <option key={i} value={i}>
              {i}
            </option>
          );
        }
        return options;
    }

    function renderTournamentPairingsystemOptions()
    {
        const options : Array<React.JSX.Element> = [];
        const pairingsystems = ['Round Robin', 'Monrad'];

        pairingsystems.map(item => 
        {
            options.push(<option key={item} value={item}>{item}</option>);
        });

        return options;
    }

    return (
        <>
        <h1 className="text-3xl font-bold underline">new tournament</h1>
        <form className='w-3/4 mx-auto my-10 p-12 relative b-333' action={formAction}>
            <Link href='/tournaments'><BackIcon /></Link>
            <div className="m-1">
                <label className='w-1/4 inline-block'>Name: </label>
                <input className="text-black p-1" name="tournament_name" id="tournament_name" required/>
            </div>
            <div className="m-1">
                <label className='w-1/4 inline-block'>Startdate: </label>
                <input className="text-black p-1" type="Date" name="tournament_startdate" id="tournament_startdate" required/>
            </div>
            <div className="m-1">
                <label className='w-1/4 inline-block'>Enddate: </label>
                <input className="text-black p-1" type="Date" name="tournament_enddate" id="tournament_enddate" required/>
            </div>
            <div className="m-1">
                <label className='w-1/4 inline-block'>Number of rounds: </label>
                <select name="number_of_rounds" className="text-black w-1/6 p-1">
                    {renderNumberOfRoundsOptions()}
                </select>
            </div>
            <div className="m-1">
                <label className='w-1/4 inline-block'>Pairingsystem: </label>
                <select name="tournament_pairingsystem" className="text-black w-1/6 p-1">
                    {renderTournamentPairingsystemOptions()}
                </select>
            </div>
            
            <div className="my-4">                    
                <button className="no-border">
                    <SaveIcon />
                </button>            
            </div>
            
        </form>
        <p aria-live="polite" className="text-white">
            {state?.message}
        </p>        
        </>
    )
    }
    
    export default AddTournament;