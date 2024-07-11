'use server'
import { sql } from '@vercel/postgres';
import { Chessplayer, Chessclub } from './definitions';
import { redirect } from 'next/navigation';

export default async function addChessplayerAction(formData: FormData)
{
	let chessplayer: Chessplayer = 
	{
		ssf_id : -1,    	
		fide_id: -1, 
    	firstname : '',
    	lastname : '', 
    	gender : '', 
    	birthyear : -1,     	
    	chessclub_id : '',		
		federation: 'Sweden'
	}
	
	chessplayer.ssf_id = +(formData.get('ssf_id') as string);
	chessplayer.fide_id = +(formData.get('fide_id') as string);
	const name =  formData.get('name_id') as string;
	chessplayer.firstname = getFirstnameFromFullname(name);
	chessplayer.lastname = getLastnameFromFullname(name);
	chessplayer.gender = formData.get('gender') as string;
	chessplayer.birthyear = +(formData.get('birthyear') as string);
	chessplayer.chessclub_id = formData.get('chessclub_id') as string;
	
	// We check if the chessplayer exist.
	try
	{		
		const result = await sql
		`
			SELECT COUNT(*) FROM chessplayers
			WHERE id=${chessplayer.ssf_id};			
  		`;		
		// The chessplayer exist => we exit.
		if(result.rows[0].count == 1)
		{
			return;
		}
	}
	catch(error)
	{
		console.log(error);
	}
	
	// We check if the fide-id exist.
	try
	{		
		const result = await sql
		`
			SELECT COUNT(*) FROM fidemembers
			WHERE id=${chessplayer.fide_id}
			AND chessplayer_id=${chessplayer.ssf_id};			
  		`;
		// The fide-id exist => we exit.
		if(result.rows[0].count == 1)
		{
			return;
		}
	}
	catch(error)
	{
		console.log(error);
	}

	createChessclubIfNotExists(chessplayer.chessclub_id);	
	
	// Insert into chessplayers
	try
	{
		await sql
		`
			INSERT INTO chessplayers(id, firstname, lastname, gender, birthyear, chessclub_id, federation_id)
			VALUES(${chessplayer.ssf_id}, ${chessplayer.firstname}, ${chessplayer.lastname}, ${chessplayer.gender}, ${chessplayer.birthyear}, 
			${chessplayer.chessclub_id}, ${chessplayer.federation});
  		`;		
	}
	catch(error)
	{
		console.log(error);
	}

	// Insert into fidemembers
	if(chessplayer.fide_id != 0)
	{
		await sql
		`
			INSERT INTO fidemembers(id, chessplayer_id)
			VALUES(${chessplayer.fide_id}, ${chessplayer.ssf_id});
  		`;		
	}
	
	redirect('/chessplayers');
}

async function updateChessplayerData(chessplayer: Chessplayer)
{
	try
	{
		await sql
		`
			UPDATE chessplayers
			SET chessclub_id=${chessplayer.chessclub_id}
			,	firstname=${chessplayer.firstname}
			,	lastname=${chessplayer.lastname}
			,	gender=${chessplayer.gender}
			,	birthyear=${chessplayer.birthyear}
			,	federation_id=${chessplayer.federation}			
			WHERE chessplayers.id=${chessplayer.ssf_id};
		`	
	}
	catch(error)
	{
		console.log(error);
	}	

	if(chessplayer.fide_id != 0)
	{
		try
		{
			await sql
			`
				INSERT INTO fidemembers(id, chessplayer_id)
				VALUES(${chessplayer.fide_id}, ${chessplayer.ssf_id});				
			`	
		}
		catch(error)
		{
			console.log(error);
		}
	}
}

async function createChessclubIfNotExists(chessclub: string)
{
	// We check if the chessclub exists. If not, we create the chessclub.
	const numberOfChessClubs = (await sql`SELECT 1 FROM chessclubs WHERE id=${chessclub};`).rowCount;
	if(numberOfChessClubs == 0)
	{
		try
		{
			await sql
			`
				INSERT INTO chessclubs
				VALUES(${chessclub});
			`	
		}
		catch(error)
		{
			console.log(error);
		}		
	}
}

function getFirstnameFromFullname(fullname : string)
{
	const names = fullname.split(' ');
	return names[0];
}

function getLastnameFromFullname(fullname : string)
{
	const names = fullname.split(' ');
	let lastname: string = "";
	for(let i = 1; i < names.length; i++)
	{
		lastname += names[i];
		if(i != names.length - 1)
		{
			lastname += " ";	
		}
	}
	return lastname;
}

function checkFullName(fullname : string) 
{
	const illegalChars:string = '0123456789èëêéÈËÊÉüùûúÜÛÛÚáàäâÁÀÄÂ';
	const names = fullname.split(' ');
	if(names.length < 2)
	{
		return false;
	}
	for(let i = 0; i < names.length; i++)
	{
		for(let j = 0; j < illegalChars.length; j++)
		{
			if(names[i][j] == illegalChars[j])
			{
				return false;
			}
		}
	}
	return true;
}

export async function saveChessplayer(formData: FormData)
{
	let chessplayer: Chessplayer = 
	{
		ssf_id : +(formData.get('ssf_id') as string),
		fide_id : +(formData.get('fide_id') as string),
		firstname : getFirstnameFromFullname(formData.get('name_id') as string),
		lastname : getLastnameFromFullname(formData.get('name_id') as string),
		gender: formData.get('gender') as string,
		birthyear:  +(formData.get('birthyear') as string),
		chessclub_id: formData.get('chessclub_id') as string,
		federation : 'Sweden'
	}

	console.log(chessplayer);
	
	if(chessplayer.chessclub_id.length < 2)
	{
		return "false";
	}
	if(!checkFullName(formData.get('name_id') as string))
	{
		return "false";
	}
	createChessclubIfNotExists(chessplayer.chessclub_id);	
	updateChessplayerData(chessplayer);

	redirect('/chessplayers');
	
}
