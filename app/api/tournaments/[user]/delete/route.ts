import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export async function POST(request: Request, { params }: { params: { user: string } })
{
    //const {user} = params;
    const body = await request.json()
    console.log(body)


    return NextResponse.json({ result: 'test' }, { status: 200 });  
}