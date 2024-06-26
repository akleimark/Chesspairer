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
    people_id : number,
    federation_id : string
    chessclub_id : string
}

