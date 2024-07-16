import Image from 'next/image'

const HomeComponent = (props : any) =>
{
    const src = '/' + props.imageName;
    return (
        <>        
            <Image className='startPage rounded-md' src={src} alt="Chess" width={1100} height={900}/>
        </>
    )
}

export default HomeComponent;