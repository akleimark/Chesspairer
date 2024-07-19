import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function POST(request: Request, response : Response)
{
    const {tournament_id, chessplayer_id} = await request.json()
    try
    {
        await 
        sql
        `
            INSERT INTO tournament_chessplayer(tournament_id, chessplayer_id)
            VALUES(${tournament_id}, ${chessplayer_id});            
        `
    }
    catch(error)
    {
        return NextResponse.json({ result: 'error' }, { status: 400 });  
    }
    
    return NextResponse.json({ result: 'ok' }, { status: 200 });  
}