"use client";

import {useState} from "react";

export const ClientComponentTwo = () => {
    const [name, setName] = useState("Batman");
    console.log("Client Component Two rendered");
    return (
        <div>
            <h3>Client Component Two</h3>
        </div>
    );
}