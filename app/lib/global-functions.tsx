
import { useCookies } from 'next-client-cookies';
import {Chessplayer, User} from '../lib/definitions'


export default function chessplayerIsValid(chessplayer : Chessplayer)
{
    if(chessplayer.chessclub_id == "" || chessplayer.federation_id == "")    
    {
        return false;
    }

    return true;
}
