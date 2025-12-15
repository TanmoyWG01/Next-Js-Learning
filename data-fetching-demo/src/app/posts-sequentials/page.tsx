import { Suspense } from "react";
import { Author } from "./author";

type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};


export default async function PostsSequentials() {
    const resUsers = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!resUsers.ok) {
        throw new Error("Failed to fetch users");
    }
    const users: User[] = await resUsers.json();

    const resPosts = await fetch("https://jsonplaceholder.typicode.com/posts"); // Fetch all posts
    if (!resPosts.ok) {
        throw new Error("Failed to fetch posts");
    }
    const posts: Post[] = await resPosts.json();

    const filteredPosts = posts.filter((post) => post.id % 10 === 1);

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {filteredPosts.map((post) => (
                    <li key={post.id} className="p-4 bg-white shadow-md rounded-lg text-gray-700">
                        <div className="font-bold">{post.title}</div>
                        <div className="text-sm">
                            <div>Body: {post.body}</div>
                            {/* <p>Author name to be fetched</p> */}
                            <Suspense 
                                fallback={<div className="text-sm text-gray-600">Loading author...</div>}
                            >
                                <Author authorId={post.userId} />
                            </Suspense>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );  
}