import Image from 'next/image'
import { cookies } from 'next/headers';

async function getUserData()
{
    "use server"
    const userEmail = cookies().get('user-email')?.value;
    try
    {
        const response : any = await fetch(`http://localhost:3000/api/user/${userEmail}`);
        return ((await response).json());
    }
    catch(error)
    {
        console.log(error);
    }
}

export default async function HomeComponent(props : any)
{
    const {user}  = await getUserData();

    const src = '/' + props.imageName;
    return (
        <>  
            <div className="h-4/6 relative">
                <p className="p-2 text-lg text-center">
                    Welcome, {user.chessplayer.firstname}!
                </p>
                <Image className='my-4 mx-auto rounded-md relative' src={src} alt="Chess" fill
                style={{objectFit:"contain"}} />        
            </div>       
            
        </>
    )
}

