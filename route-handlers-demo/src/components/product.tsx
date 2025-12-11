export default async function Product() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate async operation
    return (
        <div>
            <h2>Product Component</h2>
            <p>This is the product component content.</p>
        </div>
    );
}