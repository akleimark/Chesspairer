'use server'
import { sql } from '@vercel/postgres';
import { People, Chessplayer, Chessclub } from './definitions';
import { redirect } from 'next/navigation';



export default async function addChessplayerAction(formData: FormData)
{
	let people_id: number = -1;
	const federation_id:string = 'Sweden';

	let chessplayer: Chessplayer = 
	{
		id : -1,    	
    	firstname : '', 
    	lastname : '', 
    	gender : '', 
    	birthyear : -1,     	
    	chessclub_id : '',		
	}
	
	chessplayer.id = +(formData.get('chessplayer_id') as string);
	const name =  formData.get('name_id') as string;
	const names = name.split(' ');
	chessplayer.firstname = names[0];
	chessplayer.lastname = "";
	for(let i = 1; i < names.length; i++)
	{
		chessplayer.lastname += names[i];
		if(i != names.length - 1)
		{
			chessplayer.lastname += " ";	
		}
	}
	chessplayer.gender = formData.get('gender') as string;
	chessplayer.birthyear = +(formData.get('birthyear') as string);
	chessplayer.chessclub_id = formData.get('chessclub_id') as string;
	

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
	const numberOfChessClubs = (await sql`SELECT 1 FROM chessclubs WHERE id=${chessplayer.chessclub_id};`).rowCount;
	if(numberOfChessClubs == 0)
	{
		try
		{
			await sql
			`
				INSERT INTO chessclubs
				VALUES(${chessplayer.chessclub_id});
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
			VALUES(${chessplayer.firstname}, ${chessplayer.lastname}, ${chessplayer.birthyear}, ${chessplayer.gender})
			RETURNING id;
  		`;
		  
		const {id} = result.rows[0]; 
		people_id = id;
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
			VALUES(${chessplayer.id}, ${chessplayer.chessclub_id}, ${federation_id}, ${people_id});
  		`;		
	}
	catch(error)
	{
		console.log(error);
	}

	redirect('/chessplayers');
	
}

export async function saveChessplayer(formData: FormData)
{
	console.log(formData);
}
