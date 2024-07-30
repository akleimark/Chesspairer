import Link from "next/link"
import { StartIcon, AddIcon, PlayersIcon, TableIcon } from "./IconComponents"
import { Tournament } from '../lib/definitions';
import { startTournamentAction } from "../lib/actions";

export function TournamentButtonPanel(props : any)
{    
    const tournament : Tournament = props.selectedTournament;
    const mayStartTournament = () =>
    {
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
        <div className="fixed bottom-16">
          <Link href='/tournaments/add'>
            <button className='p-2 rounded-md border-solid border-2 border-white-600' id="addTournament">
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

        { mayStartTournament() &&             
                <button className='p-2 ml-1 rounded-md border-solid border-2 border-white-600'>
                    <StartIcon onClick={async () => {
                    await startTournamentAction(tournament)
            }} />
                </button>         
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