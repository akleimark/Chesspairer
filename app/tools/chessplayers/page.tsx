'use client'
import Chessplayer from '@/app/components/Chessplayer';
import Navbar from '@/app/components/navbar';
import React, { useEffect, useState } from 'react'
import Button from '@/app/components/Button';

const Chessplayers = () =>
{ 
  
  const [chessplayerContainer, setchessplayerContainer] = useState<any[]>([])

  useEffect(() => {
    fetch('/api/chessplayers', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        setchessplayerContainer(data.chessplayers.rows)               
      })
  }, [])
  
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
            </tr>
          </thead>
          <tbody>
          {
            chessplayerContainer.length > 0 &&
            
            chessplayerContainer.map(chessplayer => (
              <tr key={chessplayer.id}>
                <td>{chessplayer.id}</td>
                <td>{chessplayer.firstname}</td>
                <td>{chessplayer.lastname}</td>
                </tr>
            ))
          
          }
            
        </tbody>  

        </table>

        <div className="buttonPanel">
          <Button text="Add a chessplayer" />
        </div>
        
        
      </div>
      
    </>
  );

}

export default Chessplayers


  