import Image from "next/image"
import toolsImage from "@/public/tools.jpg"

export default function Tools() 
{
  return (
    <>      
        <h1 className="text-3xl font-bold underline small-caps text-center my-8">tools</h1>                
        <div className="h-4/6 relative">            
            <Image className='my-4 mx-auto rounded-md relative' src={toolsImage} alt="Chess" fill
            style={{objectFit:"contain"}} />        
            </div>   
    </>
  );
};
