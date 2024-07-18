import { NextResponse, NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";

export async function GET(request: NextRequest, { params }: { params: { id: string } })
{
    const email : string = params.id;

    const result = await sql
    `   
        SELECT  u.email, 
                c.id as ssf_id, 
                f.id as fide_id,
                c.firstname, 
                c.lastname,
                c.gender,
                c.birthyear,
                c.chessclub_id,
                c.federation_id
        FROM users u
        INNER JOIN chessplayers c
            ON c.id=u.chessplayer_id
        LEFT JOIN fidemembers f
            ON f.chessplayer_id=c.id
        WHERE u.email=${email}
    `
    if(result.rowCount == 0)
    {       
        return NextResponse.json({ result: null}, { status: 400 }); 
    }
    const user : User = 
    {
        email : result.rows[0].email,
        chessplayer : 
        {
            ssf_id : result.rows[0].ssf_id,
            fide_id: result.rows[0].fide_id, 
            firstname : result.rows[0].firstname, 
            lastname : result.rows[0].lastname, 
            gender : result.rows[0].gender, 
            birthyear : result.rows[0].birthyear,
            chessclub_id : result.rows[0].chessclub_id,
            federation: result.rows[0].federation_id
        }
    }
    
    return NextResponse.json({user: user}, { status: 200 }); 
}