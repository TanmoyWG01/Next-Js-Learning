"use client"

import { useEffect } from "react"

export default function ErrorPage({ error }: { error: Error }) {
    useEffect(() => {
        console.error("Error loading users:", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-2xl text-red-500">Failed to load users: {error.message}</div>
        </div>
    );
}   