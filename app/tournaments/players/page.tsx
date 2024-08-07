"use client";
import { Tournamentplayer, Chessplayer, Tournament} from "@/app/lib/definitions";
import { AddIcon, DeleteIcon } from "@/app/components/IconComponents";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";
import { addTournamentplayerAction, removeTournamentplayerAction, getTournamentDataAction} from "@/app/lib/actions";
import { TournamentplayersSearchbar } from "@/app/components/Searchbars";

export default function TournamentPlayersPage() 
{
    const cookieValue = useCookies().get("selected_tournament");
    let tournamentId: number = -1;
    if (cookieValue != undefined) 
    {
        tournamentId = parseInt(cookieValue);
    }
    const [tournament, setTournament] = useState<Tournament>();
    const [chessplayers, setChessplayers] = useState<Array<Chessplayer>>([]);

    function handleDataFromChild(data: Array<Chessplayer>) 
    {
        setChessplayers(data);
    }

    async function getTournamentplayers() 
    {
        fetch(`http://localhost:3000/api/tournament/${tournamentId}`, { cache: "no-store"})
        .then((res) => res.json())
        .then(({ tournament }) => 
        {
            setTournament(tournament);
        });
    }
    
    async function getAvailablePlayers() 
    {
        fetch(`http://localhost:3000/api/tournament/${tournamentId}/available-players`, { cache: "no-store" })
        .then((res) => res.json())
        .then(({ chessplayers }) => 
        {
            setChessplayers(chessplayers.rows);
        });
    }
    
    useEffect(() => 
    {
        fetch(`http://localhost:3000/api/tournament/${tournamentId}`, {cache: "no-store"})
        .then((res) => res.json())
        .then(({ tournament }) => 
        {
            setTournament(tournament);
        });
    }, [tournamentId]);

    useEffect(() =>
    {      
        document.getElementById("search")?.click();             
    }, []);
  
  useEffect(() => {fetch(`http://localhost:3000/api/tournament/${tournamentId}/available-players`, { cache: "no-store" })
  .then((res) => res.json())
  .then(({ chessplayers }) => 
  {
        setChessplayers(chessplayers.rows);
  });
  }, [tournamentId]);

  function showAvailablePlayers() {
    return (
      <table className="text-center mt-2 mb-auto w-full">
        <thead>
          <tr className="border-solid border-2 border-white-600 bg-lime-900">
            <th className="p-5 font-semibold">#</th>
            <th className="p-5 font-semibold">Firstname</th>
            <th className="p-5 font-semibold">Lastname</th>
            <th className="p-5 font-semibold">Add</th>
          </tr>
        </thead>
        <tbody>
        {chessplayers?.map((chessplayer: Chessplayer) => (
            <tr
            className="border-solid border-2 border-white-600"
            key={chessplayer.ssf_id}
          >
            <td className="opacity-80 p-1 bg-lime-900 align-middle">
              {chessplayer.ssf_id}
            </td>
            <td className="opacity-80 p-1 bg-lime-900 align-middle">
              {chessplayer.firstname}
            </td>
            <td className="opacity-80 p-1 bg-lime-900 align-middle">
              {chessplayer.lastname}
            </td>
            <td
              className="opacity-80 p-1 bg-lime-900 align-middle"
              onClick={async () => {
                await addTournamentplayerAction(chessplayer.ssf_id).then()
                {
                  getTournamentplayers();
                  getAvailablePlayers();
                  document.getElementById("search")?.click();
                }
              }}
            >
              <AddIcon alt="add" height={20} />
            </td>
          </tr>
          ))}                 
        </tbody>
      </table>
    );
  }

  function showParticipants() {
    return (
      <table className="text-center mt-2 mb-auto w-full">
        <thead>
          <tr className="border-solid border-2 border-white-600 bg-lime-900">
            <th className="p-5 font-semibold">#</th>
            <th className="p-5 font-semibold">Firstname</th>
            <th className="p-5 font-semibold">Lastname</th>
            <th className="p-5 font-semibold">Remove</th>
          </tr>
        </thead>
        <tbody>
          {tournament?.players?.map((player: Tournamentplayer) => (
            <tr
              className="border-solid border-2 border-white-600"
              key={player.chessplayer_id}
            >
              <td className="opacity-80 p-1 bg-lime-900 align-middle">
                {player.chessplayer_id}
              </td>
              <td className="opacity-80 p-1 bg-lime-900 align-middle">
                {player.firstname}
              </td>
              <td className="opacity-80 p-1 bg-lime-900 align-middle">
                {player.lastname}
              </td>
              <td className="opacity-80 p-1 bg-lime-900 align-middle"
                onClick={async () => {
                  await removeTournamentplayerAction(player.chessplayer_id).then()
                  {
                    getTournamentplayers();
                    getAvailablePlayers();
                    document.getElementById("search")?.click();
                  }
                }}
              >
                <DeleteIcon alt="delete" height={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <>      
      <h1 className="text-3xl font-bold underline small-caps text-center my-8">
        tournament players
      </h1>
      <div className="mx-auto my-10 p-4 relative bg-neutral-700 h-4/6">        
        <div className="grid grid-cols-2 gap-1 h-5/6 overflow-y-auto">
          <div>
            <h4 className="text-center font-bold text-lg">
              Available players ({chessplayers?.length})
            </h4>
            {showAvailablePlayers()}
          </div>
          <div>
            <h4 className="text-center font-bold text-lg">
              Participants ({tournament?.players?.length})
            </h4>
            {showParticipants()}
          </div>
        </div>
        <div className="absolute my-2 bottom-0">
          <TournamentplayersSearchbar onDataFromChild={handleDataFromChild} />
        </div>
      </div>
      
    </>
  );
}
