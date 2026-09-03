"use client";

import { FiSearch, FiX } from "react-icons/fi";
import Input from "@/components/ui/Input";

export default function SearchBar({
  value,
  onChange,
  onClear,
  onSubmit,
  placeholder = "Search 20+ instant tools by name, tag, or description...",
  size = "md",
  autoFocus = false,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (onSubmit) {
        onSubmit();
      }
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Input
        id="search-input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        icon={FiSearch}
        autoFocus={autoFocus}
        className={
          size === "lg"
            ? "py-4 text-base pl-12 rounded-3xl shadow-glow border-slate-300 dark:border-slate-700"
            : ""
        }
      />

      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          title="Clear Search"
          aria-label="Clear Search"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}