import { Tournament } from "../lib/definitions";
import Link from "next/link";
import { cookies } from "next/headers";
import {AddIcon, EditIcon, SelectedIcon, PlayersIcon} from "@/app/components/IconComponents"
import { TournamentButtonPanel } from "../components/TournamentButtonPanel";
import { Lato } from "next/font/google";

const lato = Lato({subsets: ["latin"], weight:'400'});

async function getAllUserTournaments(userId : string | undefined)
{
  "use server"
  try
  {    
    const response:any = await fetch(`http://localhost:3000/api/tournaments/${userId}`, { cache: "no-store" });
    return ((await response).json());

  }
  catch(error)
  {
    console.log(error);
  }
}

async function selectTournament(formData : FormData)
{
  "use server"  
  const selectedTournament : string = formData.get('selected_tournament') as string;
  cookies().set('selected_tournament', selectedTournament);
}

const renderSelectTournamentRow = (id : number | undefined) =>
{
  let selectedTournament : number;
  const cookieValue = cookies().get('selected_tournament')?.value; 
  if( cookieValue == undefined)
  {
    selectedTournament = -1;
  }
  else
  {
    selectedTournament = parseInt(cookieValue);
  }

  return (
    <>
    {(selectedTournament == -1 || selectedTournament != id) && 
    <form action={selectTournament}>
      <input type="hidden" name="selected_tournament" value={id} />
      <button type="submit" className="fake-link">
        <AddIcon alt="selected" /> 
      </button>
    </form>
    }
    {
      (selectedTournament == id) &&       
      <button type="button" className="fake-link">
        <SelectedIcon /> 
      </button>
    }
    </>
  )
}

export default async function TournamentPage()
{
  const userId = cookies().get('user-email')?.value; 
  const selectedTournament =  cookies().get('selected_tournament')?.value; 
  const tournaments : any = await getAllUserTournaments(userId);
    
    return (
    <>      
      <div className={`${lato.className} h-full overflow-hidden`}>
        <h1 className="text-3xl font-bold underline small-caps text-center my-8">tournaments</h1>
        <table className="text-center mt-2 mb-auto w-full">
          <thead>
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
          <tbody>
          {tournaments &&
              tournaments?.tournaments?.rows?.map((tournament:Tournament) => (
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
        <TournamentButtonPanel userId={userId} selectedTournament={selectedTournament} />      
      </div>
    </>
  );
};
