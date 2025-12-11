"use client"

import "./global.css"

import { useState } from "react"

interface WrapperProps {
  children: React.ReactNode
}

const ErrorSimulator = ({
    message = "An error occurred.",
}: {
    message?: string;
}) => {
    const [error, setError] = useState(false);

    if(error) {
        throw new Error(message);
    }
    
    return (
        <button title="Simulate an error" 
        className="bg-red-950 text-red-500 rounded p-1 leading-none font-semibold" 
        onClick={() => setError(true)}>
            Simulate Error
        </button>
    );
}

export const ErrorWrapper = ({ children }: WrapperProps) => {
  return (
    <div className="border-4 border-dashed border-red-500 p-4">
      <div>
        <ErrorSimulator message="Simulate error in root layout!" />
      </div>
      {children}
    </div>
  );
}