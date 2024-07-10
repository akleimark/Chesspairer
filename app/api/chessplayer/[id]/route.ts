import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: number } })
{
    const {id} = params;

    const result = await
    sql
    `   SELECT  c.id, firstname, lastname, birthyear, gender, chessclub_id
        FROM chessplayers c
        INNER JOIN people p
            ON c.people_id = p.id
        WHERE c.id=${id}
    `;

    if(result.rowCount == 1)
    {
        return NextResponse.json(
        { 
            result: 
            {
                'id'            : result.rows[0].id,
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