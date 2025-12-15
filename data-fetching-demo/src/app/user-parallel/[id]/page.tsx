type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

type Album = {
    userId: number;
    id: number;
    title: string;
}

async function getUserPosts(userId: string){
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch posts for user");
    }
    const posts: Post[] = await res.json();
    return posts;
}

async function getUserAlbums(userId: string){
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`);
    if (!res.ok) {
        throw new Error("Failed to fetch albums for user");
    }
    const albums: Album[] = await res.json();
    return albums;
}


export default async function UserProfile({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const postsData = getUserPosts(id);
    const albumsData = getUserAlbums(id);

    const [posts, albums] = await Promise.all([postsData, albumsData]);
    
    return (
        <div>
            <h1>User Profile: {id}</h1>
            <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">Posts</h2>
                <ul>
                    {posts.map(post => (
                        <li key={post.id} className="p-4 bg-white shadow-md rounded-lg text-gray-700 mb-2">
                            <div className="font-bold">{post.title}</div>
                            <div className="text-sm">Body: {post.body}</div>
                        </li>
                    ))}
                </ul>
            </section>
            <section>
                <h2 className="text-xl font-bold mb-4">Albums</h2>
                <ul>
                    {albums.map(album => (
                        <li key={album.id} className="p-4 bg-white shadow-md rounded-lg text-gray-700 mb-2">
                            <div className="font-bold">{album.title}</div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );  
}

