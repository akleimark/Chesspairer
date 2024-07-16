

export type Chessplayer = 
{
    ssf_id : number, 
    fide_id: number, 
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
    password : string
}


export type Result = 
{
    tournament_id: number,
    white: number,
    black: number,
    roundNumber: number, 
    result: string
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
    results? : Result
}