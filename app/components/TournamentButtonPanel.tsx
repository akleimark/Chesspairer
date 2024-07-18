import Link from "next/link"
import { AddIcon, PlayersIcon } from "./IconComponents"


export function TournamentButtonPanel(props : any)
{
    const userId = props.userId;
    const selectedTournament = props.selectedTournament;

    return (
        <>
        <div className="buttonPanel">
          <Link href='/tournaments/add'>
            <button className='p-2 rounded-md border-solid border-2 border-white-600' id="addTournament">
                <AddIcon alt="New tournament" />            
            </button>
          </Link>

          { selectedTournament &&            
          <Link href='/tournaments/players'>
            <button className='p-2 m-1 rounded-md border-solid border-2 border-white-600' id="manageTournamentPlayers">
                <PlayersIcon />      
            </button>
          </Link>          
        }
        </div>   
        </>    
    )
}