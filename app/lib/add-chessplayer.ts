'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { People, Chessplayer, Chessclub } from './definitions';
import chessplayerIsValid from './global-functions';
import { redirect } from 'next/navigation';

export default async function AddChessplayer(formData: FormData)
{	
	let people : People = 
	{
		id : -1,
    	firstname : '', 
    	lastname : '', 
    	gender : '', 
    	birthyear : -1
	}

	let chessplayer: Chessplayer = 
	{
		id : -1,
    	people_id : -1,
    	federation_id : 'Sweden',
    	chessclub_id : ''
	}

	let chessclub: Chessclub = 
	{
		id : ''
	}

	people.id = -1;
	chessplayer.id = +(formData.get('chessplayer_id') as string);
	const name =  formData.get('name_id') as string;
	const names = name.split(' ');
	people.firstname = names[0];
	people.lastname = "";
	for(let i = 1; i < names.length; i++)
	{
		people.lastname += names[i];
		if(i != names.length - 1)
		{
			people.lastname += " ";	
		}
	}
	people.gender = formData.get('gender') as string;
	people.birthyear = +(formData.get('birthyear') as string);
	chessclub.id = formData.get('chessclub_id') as string;
	chessplayer.federation_id = 'Sweden';

	// We check if the chessplayer exist.
	await fetch('http://localhost:3000/api/chessplayer/' + chessplayer.id, { cache: "no-store" })
	.then((res) => res.json())
	.then((data) => 
	{
		// The chessplayer already exists => we exit.
	  	if(data.status == 200)
		{
			return;
		}
	});
	// We check if the chessclub exists. If not, we create the chessclub.
	const numberOfChessClubs = (await sql`SELECT 1 FROM chessclubs WHERE id=${chessclub.id};`).rowCount;
	if(numberOfChessClubs == 0)
	{
		try
		{
			await sql
			`
				INSERT INTO chessclubs
				VALUES(${chessclub.id});
			`	
		}
		catch(error)
		{
			console.log(error);
		}		
	}
	// Insert into people
	try
	{
		const result = await sql
		`
			INSERT INTO people(firstname, lastname, birthyear, gender)
			VALUES(${people.firstname}, ${people.lastname}, ${people.birthyear}, ${people.gender})
			RETURNING id;
  		`;
		  
		const {id} = result.rows[0]; 
		people.id = id;
	}
	catch(error)
	{
		console.log(error);
	}
	
	// Insert into chessplayers
	try
	{
		await sql
		`
			INSERT INTO chessplayers(id, chessclub_id, federation_id, people_id)
			VALUES(${chessplayer.id}, ${chessclub.id}, ${chessplayer.federation_id}, ${people.id});
  		`;		
	}
	catch(error)
	{
		console.log(error);
	}
	
	redirect('/tools/chessplayers');
}

