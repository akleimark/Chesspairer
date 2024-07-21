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
            <p className="p-2 text-center">
                Welcome, {user.chessplayer.firstname}!
            </p>
            <Image className='my-4 mx-auto rounded-md' src={src} alt="Chess" width={1000} height={800}/>
        </>
    )
}

