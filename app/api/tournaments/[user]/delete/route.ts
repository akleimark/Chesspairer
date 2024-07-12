import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { user: string } })
{
    const {user} = params;
    console.log(user);
    return NextResponse.json({ result: user }, { status: 200 });  
}