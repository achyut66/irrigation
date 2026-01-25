"use client";

import React from "react";

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
}

export default function PrimaryButton({
  loading = false,
  label = "Submit",
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        bg-blue-600 hover:bg-blue-700 text-white
        px-4 py-2 rounded-lg font-medium transition-all
        disabled:bg-blue-400 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
