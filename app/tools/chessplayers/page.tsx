"use client"
import Navbar from "@/app/navbar";
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import {useEffect, useState} from 'react';

const Chessplayers = () => {

  const [chessplayers, setChessplayers] = useState([]);

  useEffect(() => {
    fetch('/api/chessplayers')
      .then((res) => res.json())
      .then((data) => {
       console.log(data);
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
              <th>FIDE-id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Club</th>
              <th>Federation</th>
            </tr>
          </thead>


        </table>
        
      </div>
      
    </>
  );

  
}

export default Chessplayers
  