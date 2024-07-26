
import LoginForm from '@/app/components/LoginForm';
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: "400" });

const Login = () =>
{ 
  return (
    <>
      <div className={`${lato.className} h-full overflow-hidden`}>
      <h1 className="text-3xl font-bold underline small-caps text-center my-8">login</h1>
        <LoginForm />
      </div>    
    </>
  );
}

export default Login;



  