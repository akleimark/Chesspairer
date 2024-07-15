import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

async function isValidEmail(email : string)
{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    return emailPattern.test(email);
}

export async function POST(request: NextRequest, response: NextResponse)
{
    const {email, password} = await request.json();

    const result = await 
    sql
    `   SELECT password
        FROM users 
        WHERE email=${email};
    `;        

    if(result.rowCount == 0 || !isValidEmail(email) || password != result.rows[0].password)
    {
        return NextResponse.json(
        {
            result: "Error",
        },
        { 
            status: 400 
        });    

    }
    return NextResponse.json(
    {
        result: "Okej",
    },
    { 
        status: 200 
    });      
      
} 
    
