"use client";

import React from "react";

interface SuccessButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
}

export default function SuccessButton({
  loading = false,
  label = "Success",
  className = "",
  ...props
}: SuccessButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        bg-green-600 hover:bg-green-700 text-white 
        px-4 py-2 rounded-lg font-medium transition-all 
        disabled:bg-green-400 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
