"use client";

import { Copy } from "lucide-react";

export default function CopyButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800"
    >
      <Copy size={18} />
      Copy
    </button>
  );
}