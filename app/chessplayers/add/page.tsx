"use client"
import addChessplayerAction from '@/app/lib/actions'
import Link from "next/link";
import { BackIcon } from "@/app/components/IconComponents";
import { SaveIcon } from "@/app/components/IconComponents";
import { useFormState } from 'react-dom'
import { Lato } from "next/font/google";

const initialState = 
{
    message: '',
}

const lato = Lato({subsets: ["latin"], weight:'400'});

const AddChessplayer = () =>
{
  const [state, formAction] = useFormState(addChessplayerAction, initialState)

    const renderBirthYearsOptions = () => 
    {
      const options = [];
  
      for (
        let i = new Date().getFullYear() - 100;
        i <= new Date().getFullYear();
        i++
      ) {
        options.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      return options;
    };
      
    const renderGenderOptions = () => 
    {
      const options = [];
      options.push(
        <option key="male" value="male">
          Male
        </option>
      );
      options.push(
        <option key="female" value="female">
          Female
        </option>
      );
      return options;
    };

    return (
       <>
          <div className={lato.className}>
            <h1 className="text-3xl font-bold underline small-caps text-center my-8">add a chessplayer</h1>
            <form className='text-xl w-3/4 mx-auto my-10 p-12 relative bg-neutral-700' action={formAction}>
              <Link href='/chessplayers'><BackIcon /></Link>
                <div className="m-1">
                    <label className='w-1/4 inline-block'>SSF-id: </label>
                    <input className="text-black p-1 w-96" name="ssf_id" id="ssf_id" required/>
                </div>
                <div className="m-1">
                    <label className='w-1/4 inline-block'>FIDE-id: </label>
                    <input className="text-black p-1 w-96" name="fide_id" id="fide_id"/>
                </div>
                <div className="m-1">
                <label className='w-1/4 inline-block'>Name: </label>
                <input className="text-black p-1 w-96" name="name_id" id="name_id" required/>
              </div>
              <div className="m-1">
                <label className='w-1/4 inline-block'>Birthyear: </label>
                <select name="birthyear" className="text-black w-1/6 p-1">
                  {renderBirthYearsOptions()}
                </select>
              </div>
              <div className="m-1">
                <label className='w-1/4 inline-block'>Gender: </label>
                <select name="gender" className="text-black w-1/6 p-1">
                  {renderGenderOptions()}
                </select>
              </div>
              <div className="m-1">
                <label className='w-1/4 inline-block'>Chessclub: </label>
                <input className="text-black p-1 w-96" name="chessclub_id" id="chessclub_id" required />
              </div>
              <div className="my-4">
                <button className="no-border"><SaveIcon /></button>
              </div>
            </form>  
            <p aria-live="polite" className="text-white">
              {state?.message}
            </p>
          </div> 
       </>
    )
}

export default AddChessplayer;