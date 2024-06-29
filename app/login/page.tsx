'use client'
import { useCookies } from 'next-client-cookies';
import LoginForm from '@/app/components/LoginForm';
import { redirect, useRouter } from "next/navigation";

const Login = () =>
{ 
  const cookies = useCookies();
  
  if(cookies.get('user-email') != undefined)
  {
    redirect('/');    
  }

  return (
    <>
      <div className="wrapper">
        <h1 className="text-3xl font-bold underline">login</h1>
        <LoginForm />
      </div>
      
    </>
  );

}

export default Login;



  