"use client";
import { useParams } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";
import { saveChessplayerAction } from "@/app/lib/actions";
import { BackIcon, SaveIcon } from "@/app/components/IconComponents";
import Link from "next/link";
import { useFormState } from 'react-dom'
import { Lato } from "next/font/google";
import { useRouter } from "next/navigation";

const lato = Lato({subsets: ["latin"], weight:'400'});

const initialState = 
{
    message: '',
}

const EditChessplayer = () => 
{
  const [state, formAction] = useFormState(saveChessplayerAction, initialState)
  const updateChessclub = (event: ChangeEvent<HTMLInputElement>) => 
  {
    setChessclub(event.target.value);
  };

  const updateChessplayerName = (event: ChangeEvent<HTMLInputElement>) => 
  {
    setChessplayerName(event.target.value);
  };

  const [fideId, setFideId] = useState(-1);
  const [chessplayerName, setChessplayerName] = useState('');
  const [chessplayerGender, setChessplayerGender] = useState('');
  const [chessplayerBirthyear, setChessplayerBirthyear] = useState(1900);
  const [chessclub_id, setChessclub] = useState('');
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
   
    fetch(`/api/chessplayer/${params.id}`, { cache: "no-store" })      
      .then((res) => res.json())       
      .then((data) => {
        if(data.result == 'null')
        {
          router.push("/chessplayers");
          return;
        }
        setFideId(data.result.fideid);
        setChessplayerName(data.result.firstname + ' ' + data.result.lastname);
        setChessplayerGender(data.result.gender);
        setChessplayerBirthyear(data.result.birthyear);        
        setChessclub(data.result.chessclub_id);        
      },
    (error) =>
    {
      router.push("/chessplayers");
      return;
    });      

  }, [params, router]);

  const renderBirthYearsOptions = () => {
    const options = [];
    for (
      let i = new Date().getFullYear() - 100;
      i <= new Date().getFullYear();
      i++
    ) {
      if (chessplayerBirthyear == i) {
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

  const renderGenderOptions = () => {
    const options = [];
    if (chessplayerGender == "male") {
      options.push(
        <option key="male" value="male" selected>
          Male
        </option>
      );
    } else {
      options.push(
        <option key="male" value="male">
          Male
        </option>
      );
    }
    if (chessplayerGender == "female") {
      options.push(
        <option key="female" value="female" selected>
          Female
        </option>
      );
    } else {
      options.push(
        <option key="female" value="female">
          Female
        </option>
      );
    }
    return options;
  };

  return (
    <>      
        <div className={`${lato.className} h-full overflow-hidden`}>
          <h1 className="text-3xl font-bold underline small-caps text-center my-8">edit a chessplayer</h1>
          <form className="text-xl w-3/4 mx-auto my-10 p-12 relative bg-neutral-700" action={formAction}>
            <Link href='/chessplayers'><BackIcon /></Link>
            <div className="m-1">
              <label className="w-1/4 inline-block">SSF-id: </label>
              <input type="hidden" name="ssf_id" value={params.id} />                          
              <input
                value={params.id}
                className="text-black p-1 w-96"
                name="ssf_id"
                id="ssf_id"
                disabled
              />        
            </div>                
            <div className="m-1">
              <label className="w-1/4 inline-block">Fide-id: </label>                        
              {fideId != null && 
              <input
                value={fideId}
                className="text-black p-1 w-96"
                name="fide_id"
                id="fide_id"
                disabled
              />}
              {fideId == null && 
              <input
                value={fideId}
                className="text-black p-1 w-96"
                name="fide_id"
                id="fide_id"              
              />}
            </div>
            <div className="m-1">
              <label className="w-1/4 inline-block">Name: </label>
              <input
                onChange={updateChessplayerName}
                value={chessplayerName}
                className="text-black p-1 w-96"
                name="name_id"
                id="name_id"
                required
              />
            </div>
            <div className="m-1">
              <label className="w-1/4 inline-block">Birthyear: </label>
              <select name="birthyear" className="text-black w-1/6 p-1">
                {renderBirthYearsOptions()}
              </select>
            </div>
            <div className="m-1">
              <label className="w-1/4 inline-block">Gender: </label>
              <select name="gender" className="text-black w-1/6 p-1">
                {renderGenderOptions()}
              </select>
            </div>
            <div className="m-1">
              <label className="w-1/4 inline-block">Chessclub: </label>
              <input
                onChange={updateChessclub}
                value={chessclub_id}
                className="text-black p-1 w-96"
                name="chessclub_id"
                id="chessclub_id"
                required
              />
            </div>
            <div className="my-4">
              <button><SaveIcon /></button>
            </div>
          </form>
          <p aria-live="polite" className="text-white">
            {state?.message}
          </p>
        </div>
    </>
  );
};

export default EditChessplayer;
