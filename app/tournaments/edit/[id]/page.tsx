"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveTournamentAction, deleteTournamentAction } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import { SaveIcon, DeleteIcon } from "@/app/components/IconComponents";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

const initialState = {
  message: "",
};

const EditTournament = () => {
  const [state, formAction] = useFormState(saveTournamentAction, initialState);
  const params = useParams();
  const [tournamentName, setTournamentName] = useState("");
  const [pairingsystem, setPairingsystem] = useState("");
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const userEmail = useCookies().get('user-email');
  const router = useRouter();

  const renderNumberOfRoundsOptions = () => {
    const options = [];

    for (let i = 2; i <= 16; i++) {
      if (numberOfRounds == i) {
        options.push(
          <option key={i} value={i} selected>
            {i}
          </option>
        );
      } else {
        options.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
    }
    return options;
  };

  const tryToDeleteTournament = (event: React.FormEvent) =>
  {
    event.preventDefault();
    const value = confirm("Are you sure?");
    if(value)
    {
      deleteTournamentAction(parseInt(params.id as string));
    }
  }

  const renderTournamentPairingsystemOptions = () => {
    const options: Array<React.JSX.Element> = [];
    const pairingsystems = ["Round Robin", "Monrad"];

    pairingsystems.map((item) => {
      if (pairingsystem == item) {
        options.push(
          <option key={item} value={item} selected>
            {item}
          </option>
        );
      } else {
        options.push(
          <option key={item} value={item}>
            {item}
          </option>
        );
      }
    });

    return options;
  };

  useEffect(() => 
  {
    fetch(`/api/tournament/${params.id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then(({tournament}) => {   
          if(tournament.user_email != userEmail)
          {            
            router.push('/tournaments');
            return;
          }       
          setTournamentName(tournament.name);
          setStartdate(tournament.startdate);
          setEnddate(tournament.enddate);
          setNumberOfRounds(tournament.number_of_rounds);
          setPairingsystem(tournament.pairingsystem);  
      },
    (error) => 
    {
      router.push('/tournaments');
      return;
    });
  }, [params, userEmail, router]);

  return (
    <>                  
      <h1 className="text-3xl font-bold underline small-caps text-center my-8">edit a tournament</h1>
      <form className="text-xl w-3/4 mx-auto my-10 p-12 relative bg-neutral-700" action={formAction}>          
        <div className="m-1">
          <label className="w-1/4 inline-block">Tournament-id: </label>
          <input type="hidden" name="tournament_id" value={params.id} />
          <input
            value={params.id}
            className="text-black p-1 w-96"
            name="tournament_id"
            id="tournament_id"
            disabled
          />
        </div>
        <div className="m-1">
          <label className="w-1/4 inline-block">Name: </label>
          <input
            onChange={(event) => {
              setTournamentName(event.target.value);
            }}
            value={tournamentName}
            className="text-black p-1 w-96"
            name="tournament_name"
            id="tournament_name"
            required
          />
        </div>
        <div className="m-1">
          <label className="w-1/4 inline-block">Startdate: </label>
          <input
            onChange={(event) => {
              setStartdate(event.target.value);
            }}
            value={startdate}
            className="text-black p-1"
            name="tournament_startdate"
            id="tournament_startdate"
            type="date"
            required
          />
        </div>
        <div className="m-1">
          <label className="w-1/4 inline-block">Enddate: </label>
          <input
            onChange={(event) => {
              setEnddate(event.target.value);
            }}
            value={enddate}
            className="text-black p-1"
            name="tournament_enddate"
            id="tournament_enddate"
            type="date"
            required
          />
        </div>
        <div className="m-1">
          <label className="w-1/4 inline-block">Number of rounds: </label>
          <select
            name="number_of_rounds"
            onChange={(event) => {
              setNumberOfRounds(parseInt(event.target.value));
            }}
            className="text-black w-96 p-1"
          >
            {renderNumberOfRoundsOptions()}
          </select>
        </div>
        <div className="m-1">
          <label className="w-1/4 inline-block">Pairingsystem: </label>
          <select
            name="tournament_pairingsystem"
            className="text-black w-96 p-1"
            onChange={(event) => {
              setPairingsystem(event.target.value);
            }}
          >
            {renderTournamentPairingsystemOptions()}
          </select>
        </div>

        <div className="my-4">          
          <button><SaveIcon /></button>
          <button onClick={tryToDeleteTournament} type="button"><DeleteIcon /></button>                        
        </div>
      </form>
      <p aria-live="polite" className="text-white">
          {state?.message}
      </p>            
    </>
  );
};

export default EditTournament;
