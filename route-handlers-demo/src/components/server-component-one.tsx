import fs from "fs";
import { ServerComponentTwo } from "./server-component-two";
import { ClientComponentOne } from "./client-component-one";

export const ServerComponentOne = () => {
    console.log("Server Component One rendered");
    fs.readFileSync("src/components/server-component-one.tsx", "utf-8");
    return (
        <>
        <div>
            <h3>This is Server Component One</h3>
            <ClientComponentOne>
                <ServerComponentTwo />
            </ClientComponentOne>
        </div>
        </>
    );
}