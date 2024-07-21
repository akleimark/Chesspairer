import logo from '@/public/logo.png'
import Image from 'next/image'

const Logo = () =>
{
    return (
        <div className='float-left py-1 px-6'>
            <Image src={logo} alt="Chess" width={30} height={30}/> 
        </div>
    )
}

export default Logo;