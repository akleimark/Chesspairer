import Navbar from "../components/Navbar";
import { Open_Sans } from "next/font/google";
import { Tournament } from "../lib/definitions";
import Link from "next/link";
import { cookies } from "next/headers";
import {AddIcon, EditIcon, SelectedIcon} from "@/app/components/IconComponents"

const openSand = Open_Sans({ subsets: ["latin"] });

async function getAllUserTournaments()
{
  "use server"
  try
  {    
    const userId = cookies().get('user-email')?.value;
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
  const tournaments : any = await getAllUserTournaments();
    
    return (
    <>
      <Navbar />
      <div className={`wrapper ${openSand.className}`}>
        <h1 className="text-3xl font-bold underline">tournaments</h1>
        <table className="fancyTable">
          <thead>
            <tr>            
              <th>Name</th>
              <th>Pairingsystem</th>
              <th>Number of rounds</th>
              <th>Startdate</th>
              <th>Enddate</th>
              <th>Edit</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
          {tournaments &&
              tournaments.tournaments.rows.map((tournament:Tournament) => (
                <tr key={tournament.id}>                  
                  <td>{tournament.name}</td>
                  <td>{tournament.pairingsystem}</td>
                  <td>{tournament.number_of_rounds}</td>
                  <td>{tournament.startdate}</td>
                  <td>{tournament.enddate}</td>
                  <td><Link href={`/tournaments/edit/${tournament.id}`}><EditIcon /></Link></td>
                  <td>{renderSelectTournamentRow(tournament.id)}</td>
                </tr>
              ))}                            
          </tbody>
        </table>
        <div className="buttonPanel">
          <Link href='/tournaments/add'>
            <button className='p-2 rounded-md border-solid border-2 border-white-600' id="addTournament">
                <AddIcon alt="New tournament" />
            </button>
          </Link>
        </div> 
      </div>
    </>
  );
};
