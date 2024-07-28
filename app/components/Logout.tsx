"use client"
import { logoutAction } from "../lib/actions";
import {LogoutIcon } from "./IconComponents";

const Logout = () =>
{
    return (                                            
        <LogoutIcon onClick={async () => {
            await logoutAction()
          }} />        
    )
}

export default Logout;