type Author = {
    id: number;
    name: string;
}

export async function Author({ authorId }: { authorId: number }) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${authorId}`);      
    if (!res.ok) {
        throw new Error("Failed to fetch author");
    }
    const author: Author = await res.json();

    return (
        <div className="text-sm text-gray-600">
            Written by: {""}
            <span className="font-semibold text-gray-700 hover:text-gray-900 transition-colors duration-200">{author.name}</span>
        </div>
    );
}