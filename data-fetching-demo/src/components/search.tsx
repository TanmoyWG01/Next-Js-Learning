"use client";

import { useState, FormEvent } from "react";

export const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Searching for:", searchTerm);
		// Add search logic here
	};

	return (
		<div className="w-full max-w-md">
			<form onSubmit={handleSubmit} className="flex gap-2">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					placeholder="Search products..."
					className="flex-1 rounded border border-gray-300 px-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
				/>
				<button
					type="submit"
					className="rounded bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
				>
					Search
				</button>
			</form>
		</div>
	);
};