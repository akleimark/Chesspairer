import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import { Tournament } from "@/app/lib/definitions";

export async function GET(request: Request, { params }: { params: { id: number } })
{
    const {id} = params;

    const result = await
    sql
    `   SELECT  t.id,
                t.name, 
                t.user_email, 
                t.pairingsystem, 
                t.number_of_rounds, 
                t.startdate, 
                t.enddate                
        FROM tournaments t                
        WHERE t.id=${id};
    `;

    if(result.rowCount == 1)
    {        
        const tournamentplayers = await
        sql
        `   SELECT  tc.chessplayer_id,
                    tc.player_number,
                    c.firstname,
                    c.lastname,
                    c.birthyear

            FROM tournament_chessplayer tc
            INNER JOIN chessplayers c
                ON c.id=tc.chessplayer_id
            WHERE tc.tournament_id=${id}
            ORDER BY tc.player_number
        `;
        const tournamentResults = await
        sql
        `   SELECT  r.tournament_id,
            r.white,
            r.black,
            r.round_number, 
            r.result
            FROM results r            
            WHERE r.tournament_id=${id}            
        `;

        const tournament : Tournament = 
        {
            id: result.rows[0].id,
            user_email : result.rows[0].user_email,     
            name: result.rows[0].name,
            pairingsystem: result.rows[0].pairingsystem, 
            number_of_rounds: result.rows[0].number_of_rounds,
            startdate: result.rows[0].startdate,
            enddate: result.rows[0].enddate,
            players: tournamentplayers.rows,
            results: tournamentResults.rows
        }
         
        return NextResponse.json({ tournament: tournament }, { status: 200 });                  
    }

    return NextResponse.json({ tournament: 'null' }, { status: 400 });  
}