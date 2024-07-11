import Image from 'next/image'
import { redirect } from "next/navigation";
import { getCookies } from 'next-client-cookies/server';

const HomeComponent = (props : any) =>
{
    const cookies = getCookies();
    if (cookies.get("user-email") == undefined) 
    {
        redirect("/login");
    }        

    const src = '/' + props.imageName;
    return (
        <>        
            <Image className='startPage round-corners' src={src} alt="Chess" width={1100} height={900}/>
        </>
    )
}


export default HomeComponent;