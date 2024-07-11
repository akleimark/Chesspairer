import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: number } })
{
    const {id} = params;

    const result = await
    sql
    `   SELECT  c.id as ssfid, f.id as fideid, firstname, lastname, birthyear, gender, chessclub_id
        FROM chessplayers c
        LEFT JOIN fidemembers f
            ON f.chessplayer_id = c.id
        WHERE c.id=${id}
    `;

    if(result.rowCount == 1)
    {
        return NextResponse.json(
        { 
            result: 
            {
                'ssfid'         : result.rows[0].ssfid,
                'fideid'        : result.rows[0].fideid,
                'firstname'     : result.rows[0].firstname,
                'lastname'      : result.rows[0].lastname,
                'birthyear'     : result.rows[0].birthyear,
                'gender'        : result.rows[0].gender,
                'chessclub_id'  : result.rows[0].chessclub_id,
            }
        }, 
        { 
            status: 200 
        });                 
    }

    return NextResponse.json({ result: 'null' }, { status: 400 });  
}