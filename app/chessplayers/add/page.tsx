import Navbar from "@/app/components/Navbar"
import addChessplayerAction from '@/app/lib/actions'
import Button from "@/app/components/Button";
import Image from "next/image";
import Link from "next/link";
import backArrow from '@/public/back_arrow.png'
import { Open_Sans } from "next/font/google";

const openSand = Open_Sans({subsets: ["latin"]})

const AddChessplayer = () =>
{
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
        <Navbar />
        <div className={`wrapper ${openSand.className}`}>
            <h1 className="text-3xl font-bold underline">add a chessplayer</h1>
            <form className='w-3/4 mx-auto my-10 p-12 relative' action={addChessplayerAction}>
              <Link href='/chessplayers'><Image alt="Back" src={backArrow} width={50} height={50} /></Link>
                <div className="m-1">
                    <label className='w-1/4 inline-block'>SSF-id: </label>
                    <input className="text-black p-1" name="ssf_id" id="ssf_id" required/>
                </div>
                <div className="m-1">
                    <label className='w-1/4 inline-block'>FIDE-id: </label>
                    <input className="text-black p-1" name="fide_id" id="fide_id"/>
                </div>
                <div className="m-1">
                <label className='w-1/4 inline-block'>Name: </label>
                <input className="text-black p-1" name="name_id" id="name_id" required/>
              </div>
              <div className="m-1">
                <label className='w-1/4 inline-block'>Birthyear: </label>
                <select name="birthyear" className="text-black w-1/6">
                  {renderBirthYearsOptions()}
                </select>
              </div>
              <div className="m-1">
                <label className='w-1/4 inline-block'>Gender: </label>
                <select name="gender" className="text-black w-1/6">
                  {renderGenderOptions()}
                </select>
              </div>
              <div className="m-1">
                <label className='w-1/4 inline-block'>Chessclub: </label>
                <input className="text-black p-1" name="chessclub_id" id="chessclub_id" required />
              </div>
              <div className="my-4"><Button text="Add" /></div>
            </form>
        </div>
       </>
    )
}

export default AddChessplayer;