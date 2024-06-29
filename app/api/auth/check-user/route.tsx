import { NextResponse } from "next/server";
import {User} from '@/app/lib/definitions'
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from "next";
import { sql } from "@vercel/postgres";

async function isValidEmail(email : string)
{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;    
    return emailPattern.test(email);
}

export async function POST(request : Request, response : Response)
{
    const {email, password} = await request.json();
    
    const result = await 
    sql
    `   SELECT password
        FROM users 
        WHERE email=${email};
    `;        
    const rows = result.rowCount;
    
    if(rows == 0 || !isValidEmail(email) || !bcrypt.compareSync(password, result.rows[0].password))
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