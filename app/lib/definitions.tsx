export type Chessplayer = 
{
    ssf_id : number, 
    fide_id?: number, 
    firstname : string, 
    lastname : string, 
    gender : string, 
    birthyear : number,
    chessclub_id : string,
    federation: string
}

export type Chessclub = 
{
    id: string
}

export type User = 
{
    email : string, 
    password? : string,
    chessplayer : Chessplayer
}

export type Result = 
{
    tournament_id: number,
    white: number,
    black: number,
    round_number: number, 
    result: string
}

export type TournamentRoundResult = 
{
    white : string,
    black : string,
    round_number : number, 
    result : string
}


export type Tournamentplayer = 
{
    chessplayer_id : number,
    firstname : string, 
    lastname : string, 
    birthyear : number,
    player_number : number
}


export type Tournament = 
{
    id?: number | undefined, 
    user_email: string | undefined, 
    name: string,
    pairingsystem: string, 
    number_of_rounds: number,
    startdate: string,
    enddate: string,
    results? : Array<any>,
    players?: Array<any>
}