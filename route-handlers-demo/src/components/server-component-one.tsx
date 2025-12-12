import fs from "fs";

export const ServerComponentOne = () => {
    console.log("Server Component One rendered");
    fs.readFileSync("src/components/server-component-one.tsx", "utf-8");
    return (
        <div>
            <h3>This is Server Component One</h3>
        </div>
    );
}