"use client"
import { redirect, useRouter } from "next/navigation";
import { FormEvent } from 'react'
import { useCookies } from 'next-client-cookies';


const LoginForm = () =>
{
  const cookies = useCookies();
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>)
  {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const response = await fetch('/api/auth/check-user', 
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    
    if(response.status == 200) 
    {
      cookies.set('user-email', email);            
      router.push('/');
    } 
   
  }
    return (
        <form className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 m-4" onSubmit={handleSubmit}>
          <div className="mb-4 w-1/3">            
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="E-mail"></input>
            <input className="shadow appearance-none border rounded mt-3 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password"></input>
            <button className="mb-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
          </div>
        </form>
    )
}

export default LoginForm;