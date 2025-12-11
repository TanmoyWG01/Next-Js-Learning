import { headers, cookies } from "next/headers";
import {type NextResponse } from "next/server";

export async function GET(request: NextResponse) {  

  // const requestHeader = new Headers(request.headers);
  // console.log(requestHeader.get("Authorization"));

  const headerList = await headers(); 
  console.log(headerList.get("Authorization"));

  const theme =request.cookies.get("theme");
  console.log("Cookie Theme:", theme);

  const cookieStore = await cookies();
  cookieStore.set("ResultPage", "20");
  console.log(cookieStore.get("ResultPage"));
  

  return new Response("<h1>Hello, Next.js Route Handlers API!</h1>",{
    headers: { 
      "Content-Type": "text/html",
      "Set-Cookie": "theme=dark"
     }
  });
}

