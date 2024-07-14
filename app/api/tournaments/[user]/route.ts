import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { user: string } })
{
    const {user} = params;
    const tournaments = await
    sql
    `   
        SELECT      t.id      
            ,       t.name 
            ,       t.pairingsystem
            ,       t.number_of_rounds
            ,       t.startdate
            ,       t.enddate
            FROM    tournaments t
            WHERE   t.user_email=${user};               
    `;
    
    return NextResponse.json({ tournaments }, { status: 200 });  
}