
import { redirect } from "next/navigation";
import CheckLogin from '../lib/check-login'
import {User} from '../lib/definitions'
import getCurrentUser from '../lib/global-functions'

const Login = () =>
{ 
  const user : User = getCurrentUser();
  console.log(user);

  if(user.email != '')
  {
    redirect("/");
  }
  
  return (
    <>
      <div className="wrapper">
        <h1 className="text-3xl font-bold underline">login</h1>
        <form className="bg-slate-100 shadow-md rounded px-8 pt-6 pb-8 m-4" action={CheckLogin}>
          <div className="mb-4 w-1/3">            
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="email" type="email" placeholder="E-mail"></input>
            <input className="shadow appearance-none border rounded mt-3 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="password" type="password" placeholder="Password"></input>
            <button className="mb-2 mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button>
          </div>
        </form>
      </div>
      
    </>
  );

}

export default Login


  