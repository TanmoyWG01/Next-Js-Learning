"use client";

import {serverSideFunction} from "@/utils/server-utils";

export default function ClientRoutePage() {
    const result = serverSideFunction();
    return (
        <div>
            <h2>Client Route Page {result}</h2>
        </div>
    );
}