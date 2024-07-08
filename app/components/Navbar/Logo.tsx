import logo from '@/public/logo.png'
import Image from 'next/image'

const Logo = () =>
{
    return (
        <div id="logo">
            <Image src={logo} alt="Chess" width={30} height={30}/> 
        </div>
    )
}

export default Logo;