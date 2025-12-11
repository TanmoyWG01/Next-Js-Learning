    export default async function ProductsPage({
    params,
  }: {
    params: Promise<{ id: string }>;
    }){
        const { id } = await params;
        // console.log(`Product ${id} server component rendered`);
        return (
            <h1>
                Product {id} details rendered at {new Date().toLocaleTimeString()}
            </h1>
        )
    }