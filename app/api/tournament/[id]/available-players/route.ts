import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: number } })
{   
    const tournamentId : number = params.id;
    
    const chessplayers = await 
    sql
        ` SELECT  
                c.id as ssf_id, 
                f.id as fide_id,  
                c.firstname as firstname, 
                c.lastname as lastname, 
                c.birthyear as birthyear, 
                cc.id as chessclub_id
                FROM chessplayers c
                LEFT join fidemembers f
                    ON f.chessplayer_id=c.id
                INNER join chessclubs cc
                    ON cc.id=c.chessclub_id                                  
               WHERE NOT EXISTS
               (
                SELECT chessplayer_id from tournament_chessplayer
                WHERE tournament_id=${tournamentId} and chessplayer_id=c.id
               )
              ORDER BY lastname                                  
        ;`; 

    return NextResponse.json({ chessplayers : chessplayers }, { status: 200 });  
}

