import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export async function GET()
{
  const chessplayers = await 
  sql
    ` SELECT  c.id as fideId, 
              p.firstname as firstname, 
              p.lastname as lastname, 
              p.birthyear as birthyear, 
              cc.id as chessclub
              FROM people p
              INNER join chessplayers c
                ON c.people_id=p.id
              INNER join chessclubs cc
                ON cc.id=c.chessclub_id
              ORDER BY lastname
              
              
              
              ;`;
  return NextResponse.json({ chessplayers }, { status: 200 });  
}

