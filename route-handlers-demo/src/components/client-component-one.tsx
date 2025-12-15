"use client";

import {useState} from "react";
// import { ClientComponentTwo } from "./client-component-two";
import { ServerComponentOne } from "./server-component-one";

export const ClientComponentOne = ({children}: {
    children?: React.ReactNode;
}) => {
    const [name, setName] = useState("Batman");
    console.log("Client Component One rendered");
    return (
        <div>
            <h3>Client Component One</h3>
            {children}
            {/* <ClientComponentTwo/> */}
            {/* <ServerComponentOne /> */}
        </div>
    );
}