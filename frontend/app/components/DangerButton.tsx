"use client";

import React from "react";

interface DangerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
}

export default function DangerButton({
  loading = false,
  label = "Delete",
  className = "",
  ...props
}: DangerButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        bg-red-600 hover:bg-red-700 text-white
        px-4 py-2 rounded-lg font-medium transition-all
        disabled:bg-red-400 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
