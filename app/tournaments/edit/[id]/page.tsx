"use client";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { useEffect, useState, ChangeEvent, SetStateAction } from "react";
import { saveTournamentAction, deleteTournamentAction } from "@/app/lib/actions";
import Image from "next/image";
import Link from "next/link";
import backArrow from "@/public/back_arrow.png";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

const EditTournament = () => {
  const [state, formAction] = useFormState(saveTournamentAction, initialState);
  const params = useParams();
  const router = useRouter();

  const [tournamentName, setTournamentName] = useState("");
  const [pairingsystem, setPairingsystem] = useState("");
  const [numberOfRounds, setNumberOfRounds] = useState(0);
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");

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

  const tryTodeleteTournament = (event: React.FormEvent) =>
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

  useEffect(() => {
    fetch(`/api/tournament/${params.id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
       // if (true) {
          setTournamentName(data.result.name);
          setStartdate(data.result.startdate);
          setEnddate(data.result.enddate);
          setNumberOfRounds(data.result.number_of_rounds);
          setPairingsystem(data.result.pairingsystem);
       // } 
        //else {
          //router.push("/tournaments");
        //}
      });
  }, [params, router]);

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1 className="text-3xl font-bold underline">edit a tournament</h1>
        <form className="w-3/4 mx-auto my-10 p-12 relative" action={formAction}>
          <Link href="/tournaments">
            <Image alt="Back" src={backArrow} width={50} height={50} />
          </Link>
          <div className="m-1">
            <label className="w-1/4 inline-block">Tournament-id: </label>
            <input type="hidden" name="tournament_id" value={params.id} />
            <input
              value={params.id}
              className="text-black p-1"
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
              className="text-black p-1"
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
              className="text-black w-1/6 p-1"
            >
              {renderNumberOfRoundsOptions()}
            </select>
          </div>
          <div className="m-1">
            <label className="w-1/4 inline-block">Pairingsystem: </label>
            <select
              name="tournament_pairingsystem"
              className="text-black w-1/6 p-1"
              onChange={(event) => {
                setPairingsystem(event.target.value);
              }}
            >
              {renderTournamentPairingsystemOptions()}
            </select>
          </div>

          <div className="my-4">
            <button className="m-2">Save</button>
            <button onClick={tryTodeleteTournament} type="button" className='bg-red-900'>Delete</button>
          </div>
        </form>
        <p aria-live="polite" className="text-white">
            {state?.message}
        </p>
      </div>
    </>
  );
};

export default EditTournament;
