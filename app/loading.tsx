import Image from "next/image"
import loadingImage from "@/public/loading.png"

export default function Loading()
{
    return (
        <Image className='my-4 mx-auto rounded-md' src={loadingImage} alt="loading" height={300}/>
    )
}

