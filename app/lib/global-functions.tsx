import { cookies } from 'next/headers'
import {User} from '../lib/definitions'

export default function getCurrentUser()
{
    
    let user : User = 
    {
        email : '', 
        password : ''
    }

    const cookieValue : string = cookies().get('user_email')?.value as string;
    if(cookieValue != undefined)
    {
        user.email = cookieValue;
    }

    return user;

}