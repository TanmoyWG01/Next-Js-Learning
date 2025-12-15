import { useState, useEffect, use } from "react";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default async function UsersClient() {
   const [users, setUsers] = useState<User[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");

   useEffect(() => {
       async function fetchUsers() {
           try {
               const res = await fetch("https://jsonplaceholder.typicode.com/users");
               if (!res.ok) {
                   throw new Error("Failed to fetch users");
               }
               const data: User[] = await res.json();
               setUsers(data);
           } catch (err) {
               setError((err as Error).message);
           } finally {
               setLoading(false);
           }
       }
       fetchUsers();
   }, []);

   if (loading) {
       return <div>Loading...</div>;
   }

   if (error) {
       return <div>Error: {error}</div>;
   }

   return (
       <div>
           <h1>Users List</h1>
           <ul>
               {users.map(user => (
                   <li key={user.id} className="p-4 bg-white shadow-md rounded-lg text-gray-700">
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm">
                        <div>Username: {user.username}</div>
                        <div>Email: {user.email}</div>
                        <div>Phone: {user.phone}</div>
                    </div>
                   </li>
               ))}
           </ul>
       </div>
   );   
}

