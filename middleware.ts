import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const config = {
    matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
  };

export default function middleware(request : NextRequest)
{
    const isLoggedIn : boolean = cookies().get('user-email') !== undefined;

    if(!isLoggedIn && request.url != 'http://localhost:3000/login')
    {
        return NextResponse.redirect(new URL('http://localhost:3000/login', request.url));    
    }

    return NextResponse.next();
    
}