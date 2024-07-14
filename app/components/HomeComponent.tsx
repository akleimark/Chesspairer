import Image from 'next/image'
import { redirect } from "next/navigation";


const HomeComponent = (props : any) =>
{
   

    const src = '/' + props.imageName;
    return (
        <>        
            <Image className='startPage round-corners' src={src} alt="Chess" width={1100} height={900}/>
        </>
    )
}


export default HomeComponent;