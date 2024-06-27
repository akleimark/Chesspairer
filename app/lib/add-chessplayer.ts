'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export default async function AddChessplayer(formData: FormData)
{
	const name =  formData.get('name_id') as string;
	const names = name.split(' ');
	const firstname : string = names[0];
	let lastname : string = "";
	for(let i = 1; i < names.length; i++)
	{
		lastname += names[i];
		if(i != names.length - 1)
		{
			lastname += " ";	
		}
	}
	const gender : string = formData.get('gender') as string;
	const birthyear :number = +(formData.get('birthyear') as string);
	const chessclub : string = formData.get('chessclub_id') as string;
	const federation : string = 'Sweden';

	// Insert into people
	/*
	await sql
	`
		INSERT INTO people(firstname, lastname, birthyear, gender)
		VALUES(${firstname}, ${lastname}, ${birthyear}, ${gender});
  	`;
	*/
	
	// We check if the chessclub exists.
	const numberOfChessClubs = await sql`SELECT COUNT(*) FROM chessclubs WHERE id=${chessclub};`;
    if(numberOfChessClubs.rows[0].count == 0)
	{		
		// Insert to chessclubs
		await sql
		`
			INSERT INTO chessclubs VALUES(${chessclub})
			;
		`;
	}
	
	  

	//revalidatePath('/tools/chessplayers');
}

