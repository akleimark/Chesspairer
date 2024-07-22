import logo from '@/public/logo.png'
import Image from 'next/image'

const Logo = () =>
{
    return (
        <div className='float-left my-2 py-0 px-6'>
            <Image src={logo} alt="Chess" height={44}/> 
        </div>
    )
}

export default Logo;