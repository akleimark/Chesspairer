import Navbar from "../components/Navbar";
import { getCookies } from "next-client-cookies/server";
import { Open_Sans } from "next/font/google";
import { Tournament } from "../lib/definitions";
import Link from "next/link";

const openSand = Open_Sans({ subsets: ["latin"] });
const cookies = getCookies();
const userId: string | undefined = cookies.get('user-email');

async function getAllUserTournaments()
{
  "use server"
  try
  {
    const response = fetch(`http://localhost:3000/api/tournaments/${userId}`, { cache: "no-store" });
    return ((await response).json());
  }
  catch(error)
  {
    console.log(error);
  }
}

export default async function TournamentPage()
{
    let tournaments = await getAllUserTournaments();
    console.log(tournaments);
    tournaments = tournaments.result;

    return (
    <>
      <Navbar />
      <div className={`wrapper ${openSand.className}`}>
        <h1 className="text-3xl font-bold underline">tournaments</h1>
        <table className="fancyTable">
          <thead>
            <tr>  
              <th>#</th>            
              <th>Name</th>
              <th>Pairingsystem</th>
              <th>Number of rounds</th>
              <th>Startdate</th>
              <th>Enddate</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
          {tournaments.length > 0 &&
              tournaments.map((tournament:Tournament, index : number) => (
                <tr key={tournament.id}>                  
                  <td>{index + 1}</td>
                  <td>{tournament.name}</td>
                  <td>{tournament.pairingsystem}</td>
                  <td>{tournament.number_of_rounds}</td>    
                  <td>{tournament.startdate}</td>
                  <td>{tournament.enddate}</td>              
                  <td><Link href={`/tournaments/edit/${tournament.id}`}>Edit</Link></td>                        
                </tr>
              ))}                 
          </tbody>
        </table>

        <div className="buttonPanel">
          <Link href='/tournaments/add'>
            <button
              id="addTournament">New tournament</button>
          </Link>
        </div> 
      </div>
    </>
  );
};
