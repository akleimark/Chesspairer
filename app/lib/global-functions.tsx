
import { useCookies } from 'next-client-cookies';
import {User} from '../lib/definitions'

export default function getCurrentUser()
{
    let user : User = 
    {
        email : '', 
        password : ''
    }

   

    return user;

}