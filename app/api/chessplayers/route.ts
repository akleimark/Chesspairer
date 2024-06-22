import { NextResponse } from "next/server";
import { sql } from '@vercel/postgres';

export const dynamic = 'force-dynamic';
export async function GET()
{
  const chessplayers = await sql`SELECT * FROM chessplayers;`;
  return NextResponse.json({ chessplayers }, { status: 200 });  
}

