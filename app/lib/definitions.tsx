export type People = 
{
    id : number, 
    firstname : string, 
    lastname : string, 
    gender : string, 
    birthyear : number
}

export type Chessplayer = 
{
    id : number, 
    firstname : string, 
    lastname : string, 
    gender : string, 
    birthyear : number,
    chessclub_id : string,
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