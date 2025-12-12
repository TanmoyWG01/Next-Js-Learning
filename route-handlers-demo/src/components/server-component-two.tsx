import fs from "fs";

export const ServerComponentTwo = () => {
    console.log("Server Component Two rendered");
    fs.readFileSync("src/components/server-component-two.tsx", "utf-8");
    return (
        <div>
            <h3>This is Server Component Two</h3>
        </div>
    );
}