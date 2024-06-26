'use server';
import { sql } from '@vercel/postgres';

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

	console.log("Firstname: " + firstname);
	console.log("Lastname: " + lastname);
	console.log("Gender: " + gender);
	console.log("Birthyear: " + birthyear);

	// Insert to people
	await sql
	`
		INSERT INTO people(firstname, lastname, birthyear, gender)
		VALUES(${firstname}, ${lastname}, ${birthyear}, ${gender});
  	`;

	
	  
	
}

