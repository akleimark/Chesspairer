import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function POST(request: Request, { params }: { params: { user: string } })
{
    const {user_email, tournament_name} = await request.json()
    try
    {
        const result = await
        sql
        `
            DELETE  FROM tournaments t
            WHERE   t.name=${tournament_name} 
            AND     t.user_email=${user_email};
        `
    }
    catch(error)
    {
        console.log("Error");
    }
    
    return NextResponse.json({ result: 'ok' }, { status: 200 });  
}