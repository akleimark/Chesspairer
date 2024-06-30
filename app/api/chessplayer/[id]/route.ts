import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import { Chessplayer } from "@/app/lib/definitions";

export async function GET(request: Request, { params }: { params: { id: number } })
{
    let chessplayer: Chessplayer =
    {
        id : -1,
        people_id : -1,
        federation_id : '',
        chessclub_id : ''
    }
    const {id} = params;

    const result = await
    sql
    `   SELECT  id, people_id, federation_id, chessclub_id
        FROM chessplayers
        WHERE id=${id}
    `;

    if(result.rowCount == 1)
    {
        chessplayer.id = result.rows[0].id;
        chessplayer.people_id = result.rows[0].people_id;
        chessplayer.federation_id = result.rows[0].federation_id;
        chessplayer.chessclub_id = result.rows[0].chessclub_id;
        return NextResponse.json({ result: chessplayer }, { status: 200 });  
    }

    return NextResponse.json({ result: 'null' }, { status: 400 });  
}