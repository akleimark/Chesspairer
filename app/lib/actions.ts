"use server";
import { sql } from "@vercel/postgres";
import { Chessplayer, Chessclub, Tournament } from "./definitions";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function addChessplayerAction(prevState: any, formData: FormData) 
{
	let message = '';

	
	let chessplayer: Chessplayer = 
  	{
		ssf_id: -1,
		fide_id: -1,
		firstname: "",
		lastname: "",
		gender: "",
		birthyear: -1,
		chessclub_id: "",
		federation: "Sweden",
  	};

	chessplayer.ssf_id = +(formData.get("ssf_id") as string);
	chessplayer.fide_id = +(formData.get("fide_id") as string);
	const name = formData.get("name_id") as string;
	chessplayer.firstname = getFirstnameFromFullname(name);
	chessplayer.lastname = getLastnameFromFullname(name);
	chessplayer.gender = formData.get("gender") as string;
	chessplayer.birthyear = +(formData.get("birthyear") as string);
	chessplayer.chessclub_id = formData.get("chessclub_id") as string;

	// We check if the chessplayer exist.
	
	let result = await 
	sql
		`
			SELECT COUNT(*) FROM chessplayers
			WHERE id=${chessplayer.ssf_id};			
		`;
	// The chessplayer exist => we exit.
	if (result.rows[0].count == 1) 
	{
		message = "The chessplayer already exists."
		return {
			message: message,
		};
	}

	// We check if the fide-id exist.
	result = await 
	sql
		`
			SELECT COUNT(*) FROM fidemembers
			WHERE id=${chessplayer.fide_id}
			;			
		`;			
		// The fide-id exist => we exit.
	if (result.rows[0].count == 1) 
	{
		message = "The FIDE-id already exists."
		return {
			message: message,
		};
	}

	createChessclubIfNotExists(chessplayer.chessclub_id);

	// Insert into chessplayers
	await 
	sql
		`
			INSERT INTO chessplayers(id, firstname, lastname, gender, birthyear, chessclub_id, federation_id)
			VALUES(${chessplayer.ssf_id}, ${chessplayer.firstname}, ${chessplayer.lastname}, ${chessplayer.gender}, ${chessplayer.birthyear}, 
			${chessplayer.chessclub_id}, ${chessplayer.federation});
		`;
	
	// Insert into fidemembers
	if (chessplayer.fide_id != 0) 
	{
		await sql`
				INSERT INTO fidemembers(id, chessplayer_id)
				VALUES(${chessplayer.fide_id}, ${chessplayer.ssf_id});
			`;
	}
  	if(message.length == 0)
	{
		redirect("/chessplayers");
	}	
	
	return {
		message: message,
	};
	
}

async function updateChessplayerData(chessplayer: Chessplayer) {
  try {
    await sql`
			UPDATE chessplayers
			SET chessclub_id=${chessplayer.chessclub_id}
			,	firstname=${chessplayer.firstname}
			,	lastname=${chessplayer.lastname}
			,	gender=${chessplayer.gender}
			,	birthyear=${chessplayer.birthyear}
			,	federation_id=${chessplayer.federation}			
			WHERE chessplayers.id=${chessplayer.ssf_id};
		`;
  } catch (error) {
    console.log(error);
  }

  if (chessplayer.fide_id != 0) {
    try {
      await sql`
				INSERT INTO fidemembers(id, chessplayer_id)
				VALUES(${chessplayer.fide_id}, ${chessplayer.ssf_id});				
			`;
    } catch (error) {
      console.log(error);
    }
  }
}

async function createChessclubIfNotExists(chessclub: string) {
  // We check if the chessclub exists. If not, we create the chessclub.
  const numberOfChessClubs = (
    await sql`SELECT 1 FROM chessclubs WHERE id=${chessclub};`
  ).rowCount;
  if (numberOfChessClubs == 0) {
    try {
      await sql`
				INSERT INTO chessclubs
				VALUES(${chessclub});
			`;
    } catch (error) {
      console.log(error);
    }
  }
}

function getFirstnameFromFullname(fullname: string) {
  const names = fullname.split(" ");
  return names[0];
}

function getLastnameFromFullname(fullname: string) {
  const names = fullname.split(" ");
  let lastname: string = "";
  for (let i = 1; i < names.length; i++) {
    lastname += names[i];
    if (i != names.length - 1) {
      lastname += " ";
    }
  }
  return lastname;
}

function checkFullName(fullname: string) {
  const illegalChars: string = "0123456789èëêéÈËÊÉüùûúÜÛÛÚáàäâÁÀÄÂ";
  const names = fullname.split(" ");
  if (names.length < 2) {
    return false;
  }
  for (let i = 0; i < names.length; i++) {
    for (let j = 0; j < illegalChars.length; j++) {
      if (names[i][j] == illegalChars[j]) {
        return false;
      }
    }
  }
  return true;
}

export async function saveChessplayerAction(prevState: any, formData: FormData) 
{
	let message = "";
  	let chessplayer: Chessplayer = 
	{
		ssf_id: +(formData.get("ssf_id") as string),
		fide_id: +(formData.get("fide_id") as string),
		firstname: getFirstnameFromFullname(formData.get("name_id") as string),
		lastname: getLastnameFromFullname(formData.get("name_id") as string),
		gender: formData.get("gender") as string,
		birthyear: +(formData.get("birthyear") as string),
		chessclub_id: formData.get("chessclub_id") as string,
		federation: "Sweden",
  	};

  	if (chessplayer.chessclub_id.length < 2) 
	{
    	message = "The chessclub must be at least two (2) characters."
		return {
			message: message,
		};
		
  	}
	
  	if (!checkFullName(formData.get("name_id") as string)) 
	{
    	message = "The name of the chessplayer is too short. It must at least be two(2) characters."
		return {
			message: message,
		};
  	}
	
	createChessclubIfNotExists(chessplayer.chessclub_id);
	updateChessplayerData(chessplayer);
	if(message.length == 0)
	{
		redirect("/chessplayers");
	}
	
	return {
		message: message,
	};
}

export async function newTournamentAction(prevState: any, formData: FormData) 
{
	let message = "";

	let tournament: Tournament = 
	{
		user_email: "akleimark@gmail.com",
		name: formData.get("tournament_name") as string,
		pairingsystem: formData.get("tournament_pairingsystem") as string,
		number_of_rounds: +(formData.get("number_of_rounds") as string),
		startdate: formData.get("tournament_startdate") as string,
		enddate: formData.get("tournament_enddate") as string,
	};

	if (tournament.name.length < 2) 
	{
		message = "Tournament name must be at least two characters.";
	} 
	else if (new Date(tournament.enddate) < new Date(tournament.startdate)) 
	{
		message = "The enddate cannot be greater than the startdate.";
	}

	if(message == '')
	{
		try 
		{
			await sql`
					INSERT INTO tournaments(name, user_email, pairingsystem, number_of_rounds, startdate, enddate)
					VALUES(${formData.get("tournament_name") as string}, ${
			tournament.user_email
			}, ${tournament.pairingsystem}, ${tournament.number_of_rounds}, ${
			tournament.startdate
			}, ${tournament.enddate});				
				`;
		} 
		catch (error) 
		{
			message = "There was an error. Please try again.";
		}
	}

	if (message == "") 
	{
		redirect("/tournaments");
	}
	return {
		message: message,
	};
}

export async function saveTournamentAction(prevState: any, formData: FormData) 
{
	let message = "";
	const cookieStore = cookies();
  	if (cookieStore.get("user-email") == undefined) 
	{
    redirect("/login");
  	}
	
	let tournament: Tournament = 
	{
		user_email: "akleimark@gmail.com",
		name: formData.get("tournament_name") as string,
		pairingsystem: formData.get("tournament_pairingsystem") as string,
		number_of_rounds: +(formData.get("number_of_rounds") as string),
		startdate: formData.get("tournament_startdate") as string,
		enddate: formData.get("tournament_enddate") as string,
	};

	if (tournament.name.length < 2) 
	{
		message = "Tournament name must be at least two characters.";
	} else if (new Date(tournament.enddate) < new Date(tournament.startdate)) 
	{
		message = "The enddate cannot be greater than the startdate.";
	}

	if(message == '')
	{
		try 
		{
			await sql`
					UPDATE tournaments
					SET	name=${tournament.name}
					,	pairingsystem=${tournament.pairingsystem}
					,	number_of_rounds=${tournament.number_of_rounds}
					,	startdate=${tournament.startdate}
					,	enddate=${tournament.enddate}
					WHERE id=${formData.get("tournament_id") as string};
				`;
		} 
		catch (error) 
		{
			message = "There was an error. Please try again.";
		}
	}	

	if (message == "") 
	{
		redirect("/tournaments");
	}
	return {
		message: message,
	};
}

export async function deleteTournamentAction(id: number) {
  try 
  {
    await sql`
			DELETE FROM tournaments
			where id=${id};
		`;
    
  } 
  catch (error) 
  {
    console.log(error);
  }
  redirect("/tournaments");
}

export async function getTournamentDataAction()
{
    const tournamentId = cookies().get('selected_tournament')?.value;
    try
    {
        const response:any = await fetch(`http://localhost:3000/api/tournament/${tournamentId}`, { cache: "no-store" });        
        return ((await response).json());
    }
    catch(error)
    {
        console.log(error);
    }
}

export async function getAllUserTournamentsAction()
{
	try
	{
		const userId = cookies().get('user-email')?.value; 
		const response:any = await fetch(`http://localhost:3000/api/tournaments/${userId}`, { cache: "no-store" });
    	return ((await response).json());
	}
	catch(error)
	{
		console.log(error);
	}
}

export async function selectTournamentAction(tournamentId : number | undefined)
{
	console.log("Tournament: " + tournamentId);
	if(tournamentId != undefined)
	{
		let cookieValue : string = '';
		if(tournamentId != undefined)
		{
			cookieValue += tournamentId;
			cookies().set('selected_tournament', cookieValue);
		}		
	}
}

export async function getAvailablePlayersAction()
{
	const tournamentId = cookies().get('selected_tournament')?.value;
    try
    {
        const response:any = await fetch(`http://localhost:3000/api/tournament/${tournamentId}/available-players`, { cache: "no-store" });
        return ((await response).json());
    }
    catch(error)
    {
        console.log(error);
    }
}

export async function addTournamentplayerAction(chessplayerId : number)
{
	const tournamentId = cookies().get("selected_tournament")?.value;
	const response: any = await fetch(`http://localhost:3000/api/tournaments/addplayer`, 
	{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ tournament_id: tournamentId, chessplayer_id: chessplayerId }),
	})
	
	return ((await response).json());
}
export async function removeTournamentplayerAction(chessplayerId : number)
{
	const tournamentId = cookies().get("selected_tournament")?.value;
	const response: any = await fetch(`http://localhost:3000/api/tournaments/deleteplayer`, 
	{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ tournament_id: tournamentId, chessplayer_id: chessplayerId }),
	})
	return ((await response).json());
}


export async function searchAction(firstname : string, lastname : string)
{
	const tournamentId = cookies().get('selected_tournament')?.value;
	const response: any = await fetch(`http://localhost:3000/api/chessplayers/search`, 
	{
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ tournament_id: tournamentId, firstname: firstname, lastname : lastname }),
	})
	return ((await response).json());	
}

export async function logoutAction()
{    
    cookies().getAll().map((cookie) =>
    {
		cookies().delete(cookie.name);	
    });
    redirect('/');
}

export async function startTournamentAction(tournament : Tournament)
{
	console.log(tournament);
	
}
