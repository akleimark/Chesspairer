import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';
import { TournamentRoundResult } from "@/app/lib/definitions";

export async function GET(request: Request, { params }: { params: { round_number: number } })
{
    const {round_number} = params;

    const result = await 
    sql
    `
        SELECT  c.firstname, 
                

    `

    return NextResponse.json({ results: 'null' }, { status: 400 });  
}