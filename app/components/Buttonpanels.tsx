import Link from "next/link"
import { AddIcon, PlayersIcon, TableIcon } from "./IconComponents"

export function TournamentButtonPanel(props : any)
{    
    const selectedTournament = props.selectedTournament;

    return (
        <>
        <div className="fixed bottom-16">
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