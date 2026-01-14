"use client";

import { useState } from "react";
import { useAuth, useUser } from "@clerk/nextjs";

export default function Counter() {
  const [count, setCount] = useState(0);

//   const {isLoaded, userId, sessionId, getToken} = useAuth();
  const {isLoaded, isSignedIn, user} = useUser();

// if (!isLoaded || !userId) {  
//     return null;
//   }

if(!isLoaded || !isSignedIn) {
    return null;
}

  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}