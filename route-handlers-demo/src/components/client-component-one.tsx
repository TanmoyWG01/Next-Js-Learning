"use client";

import {useState} from "react";

export const ClientComponentOne = () => {
    const [name, setName] = useState("Batman");
    console.log("Client Component One rendered");
    return (
        <div>
            <h3>Client Component One</h3>
        </div>
    );
}