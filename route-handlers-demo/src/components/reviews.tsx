export default async function Reviews() {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    return (
        <div>
            <h2>Reviews Component</h2>
            <p>This is the reviews component content.</p>
        </div>
    );
}