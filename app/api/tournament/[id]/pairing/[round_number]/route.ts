import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: number, round_number: number } })
{
    const {id, round_number} = params;

    const result = await 
    sql
    `
        SELECT  CONCAT(c1.firstname, ' ', c1.lastname) as white, 
                CONCAT(c2.firstname, ' ', c2.lastname) as black,
                r.round_number,
                r.result
        FROM results r
        INNER JOIN chessplayers c1
        ON c1.id=r.white
        INNER JOIN chessplayers c2
        ON c2.id=r.black
        WHERE r.tournament_id=${id}
        AND r.round_number=${round_number}        
    `
    if(result.rowCount == 0)
    {
        return NextResponse.json({ results: 'null' }, { status: 400 });    
    }

    return NextResponse.json({ result: result.rows }, { status: 200 });  
}