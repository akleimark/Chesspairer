import Image from 'next/image'


const HomeComponent = (props : any) =>
{
    const src = '/' + props.imageName;
    return (
        <>        
            <Image className='startPage round-corners' src={src} alt="Chess" width={850} height={500}/>
        </>
    )
}


export default HomeComponent;