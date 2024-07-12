import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { user: string } })
{
    const {user} = params;
    console.log(user);

    const result = await
    sql
    `   
        SELECT      t.name 
            ,       t.pairingsystem
            ,       t.number_of_rounds
            ,       t.startdate
            ,       t.enddate
            FROM    tournaments t
            WHERE   t.user_email=${user};               
    `;
    
    return NextResponse.json({ result: result.rows }, { status: 200 });  
}