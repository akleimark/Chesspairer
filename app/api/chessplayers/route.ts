import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export async function GET()
{
  const chessplayers = await 
  sql
    ` SELECT  c.id as ssfid, f.id as fideid,  
              c.firstname as firstname, 
              c.lastname as lastname, 
              c.birthyear as birthyear, 
              cc.id as chessclub
              FROM chessplayers c
              LEFT join fidemembers f
                ON f.chessplayer_id=c.id
              INNER join chessclubs cc
                ON cc.id=c.chessclub_id
              ORDER BY lastname                                          
              ;`;
  return NextResponse.json({ chessplayers }, { status: 200 });  
}

