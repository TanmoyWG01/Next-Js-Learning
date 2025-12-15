type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

export default async function UsersServer() {

    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate network delay  

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }
    const users: User[] = await res.json();

    // console.log("Fetched users on server:", users);

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