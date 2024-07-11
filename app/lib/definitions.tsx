

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