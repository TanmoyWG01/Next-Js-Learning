"use client";

import {useState} from "react";

export default function NavSearch() {
    const [search, setSearch] = useState("");
    console.log("NavSearch rendered");
    return (
        <div>
            List of Navigation Search
        </div>
    );
}