import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, response: Response)
{
  const chessplayers = await 
  sql
    ` SELECT  c.id as ssf_id, f.id as fide_id,  
              c.firstname as firstname, 
              c.lastname as lastname, 
              c.birthyear as birthyear, 
              cc.id as chessclub_id
              FROM chessplayers c
              LEFT join fidemembers f
                ON f.chessplayer_id=c.id
              INNER join chessclubs cc
                ON cc.id=c.chessclub_id
              ORDER BY lastname                                          
      ;`;                    

  return NextResponse.json({ chessplayers}, { status: 200 });  
}

