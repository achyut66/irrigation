"use client";

import React from "react";

interface EditButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  label?: string;
}

export default function EditButton({
  loading = false,
  label = "Edit",
  className = "",
  ...props
}: EditButtonProps) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        bg-yellow-500 hover:bg-yellow-600 text-white
        px-4 py-2 rounded-lg font-medium transition-all
        disabled:bg-yellow-300 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Processing..." : label}
    </button>
  );
}
