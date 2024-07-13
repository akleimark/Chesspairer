import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: number } })
{
    const {id} = params;

    const result = await
    sql
    `   SELECT  t.name, t.user_email, t.pairingsystem, t.number_of_rounds, t.startdate, t.enddate
        FROM tournaments t                
        WHERE t.id=${id}
    `;

    if(result.rowCount == 1)
    {
        return NextResponse.json(
        { 
            result: 
            {
                'name'              : result.rows[0].name,
                'user_email'        : result.rows[0].user_email,
                'pairingsystem'     : result.rows[0].pairingsystem,
                'number_of_rounds'  : result.rows[0].number_of_rounds,
                'startdate'         : result.rows[0].startdate,
                'enddate'           : result.rows[0].enddate,                
            }
        }, 
        { 
            status: 200 
        });                 
    }

    return NextResponse.json({ result: 'null' }, { status: 400 });  
}