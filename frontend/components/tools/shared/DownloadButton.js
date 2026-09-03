"use client";

import { Download } from "lucide-react";

export default function DownloadButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-800"
    >
      <Download size={18} />
      Download
    </button>
  );
}