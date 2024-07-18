import {LogoutIcon } from "./IconComponents";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function logout()
{
    "use server"
    cookies().getAll().map((cookie) =>
    {
        cookies().delete(cookie.name);	
    });
    redirect('/');
}

const Logout = () =>
{
    return (                                            
        <form action={logout}>
            <button type="submit"><LogoutIcon /></button> 
        </form>
    )
}

export default Logout;