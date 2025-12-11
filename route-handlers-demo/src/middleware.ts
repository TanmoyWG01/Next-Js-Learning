import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

    const responce = NextResponse.next();
    const themePresence = request.cookies.get('theme');
    
    if(!themePresence) {
        responce.cookies.set('theme', 'dark');
    }

    responce.headers.set("custom-header", "custom-value");

    return responce;


    // return NextResponse.redirect(new URL('/', request.url));


    // if(request.nextUrl.pathname === '/profile') {
    //     return NextResponse.redirect(new URL('/hello', request.nextUrl));        
    // }

    //     if(request.nextUrl.pathname === '/profile') {
    //     return NextResponse.rewrite(new URL('/hello', request.nextUrl)); // Rewriting the URL internally        
    // }

}

// export const config = {
//     matcher: '/profile',
// };