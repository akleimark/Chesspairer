import logo from '@/public/logo.png'
import Image from 'next/image'

const Logo = () =>
{
    return (
        <div className='float-left my-0 py-3 px-6'>
            <Image src={logo} alt="Chess" height={44} priority={true} /> 
        </div>
    )
}

export default Logo;