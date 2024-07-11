'use server';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { User } from '../lib/definitions';
import { cookies } from 'next/headers'

export default async function CheckLogin(formData: FormData)
{       
	const email : string = formData.get('email') as string;
	const password : string = formData.get('password') as string;
    let user : User = 
    {
        email : email, 
        password : password
    }

    const credentials = (await sql
	`
		SELECT email, password FROM users
        WHERE email=${user.email}
		;
  	`).rows[0];

    const passwordsMatch : boolean = await bcrypt.compare(password, credentials.password);

    if(passwordsMatch)
    {
        console.log("Password match.");
        cookies().set('user_email', user.email);        
    }
    else
    {
        console.log("Login incorrect.");
    }    
}

