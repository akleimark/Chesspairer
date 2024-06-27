'use client'

import Navbar from '@/app/components/navbar';
import React, { FormEvent, useEffect, useState } from 'react'
import Button from '@/app/components/Button';
import AddChessplayer from '@/app/lib/add-chessplayer'
import { useRouter } from 'next/navigation'
import { useSession} from "next-auth/react"

const Chessplayers = () =>
{ 
  const router = useRouter();
  const [chessplayerContainer, setchessplayerContainer] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/chessplayers', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setchessplayerContainer(data.chessplayers.rows)               
      })
  }, [])

  const openAddChessplayerForm = () =>
  {    
    const modal = document.getElementById("addChessplayerModal");
    if(modal != null)
    {
      modal.style.display = "block";  
    }    
  }

  const closeModal = () =>
  {
    const modal = document.getElementById("addChessplayerModal");
    if(modal != null)
    {
      modal.style.display = "none";  
    }    
  }

  const renderBirthYearsOptions = () =>
  {       
    const options = [];

    for (let i = new Date().getFullYear() - 100; i <= new Date().getFullYear(); i++) 
    {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  }
  
  const renderGenderOptions = () =>
  {
    const options = [];
    options.push(<option key="male" value="male">Male</option>);
    options.push(<option key="female" value="female">Female</option>);
    
    return options;
  }

  return (
    <>
      <Navbar />
      <div className="wrapper">
        <h1 className="text-3xl font-bold underline">chessplayers</h1>
        <table className="fancyTable">
          <thead>          
            <tr>
              <th>#</th>
              <th>Firstname</th>
              <th>Lastname</th>    
              <th>Birthyear</th>          
              <th>Chessclub</th>
            </tr>
          </thead>
          <tbody>
          {
            chessplayerContainer.length > 0 &&
            
            chessplayerContainer.map(chessplayer => (
              <tr key={chessplayer.fideid}>
                <td>{chessplayer.fideid}</td>
                <td>{chessplayer.firstname}</td>
                <td>{chessplayer.lastname}</td>
                <td>{chessplayer.birthyear}</td>
                <td>{chessplayer.chessclub}</td>
                </tr>
            ))        
          }
            
        </tbody>  

        </table>

        <div className="buttonPanel">
          <Button id="addChessplayer" text="Add a chessplayer" onClick={openAddChessplayerForm}/>
        </div>
        
        <div id="addChessplayerModal" className="modal">
          <div className="modal-content">
            <h2 className="text-3xl font-bold underline center-text">add a chessplayer</h2>
            <span className="close" onClick={closeModal}>&times;</span>
            <form action={AddChessplayer}>
              <div className="row">
                <label>Fide-id: </label><input name="chessplayer_id" id="chessplayer_id" />
              </div>
              <div className="row">
                <label>Name: </label><input name="name_id" id="name_id" />
              </div>
              <div className="row">
                <label>Birthyear: </label>
                <select name="birthyear" className="round-corners">
                  {renderBirthYearsOptions()}                
                </select>
              </div>
              <div className="row">
                <label>Gender: </label>
                <select name="gender" className="round-corners">
                  {renderGenderOptions()}
                </select>
              </div>
              <div className="row">
                <label>Chessclub: </label><input name="chessclub_id" id="chessclub_id" />
              </div>

              <Button text="Add" />
            </form>
          </div>
        </div>

      </div>
      
    </>
  );

}

export default Chessplayers


  