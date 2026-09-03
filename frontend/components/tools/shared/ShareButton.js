"use client";

import { Share2 } from "lucide-react";

export default function ShareButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800"
    >
      <Share2 size={18} />
      Share
    </button>
  );
}