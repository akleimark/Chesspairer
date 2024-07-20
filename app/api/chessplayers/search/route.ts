import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function POST(request: Request, response : NextResponse)
{
    let {firstname, lastname, tournament_id} = await request.json();
    
    firstname = '%' + firstname + '%';
    lastname = '%' + lastname + '%';

    const result = await
    sql
        `
            SELECT  c.id as ssf_id,
                    c.firstname, 
                    c.lastname
            FROM chessplayers c
            LEFT join fidemembers f
                ON f.chessplayer_id=c.id
            INNER join chessclubs cc
                ON cc.id=c.chessclub_id                                  
            WHERE NOT EXISTS
            (
                SELECT chessplayer_id from tournament_chessplayer
                WHERE tournament_id=${tournament_id} and chessplayer_id=c.id
            )   
            AND c.firstname LIKE ${firstname}
            AND c.lastname LIKE ${lastname}
        `

    return NextResponse.json({ result: result }, { status: 200 });  
}