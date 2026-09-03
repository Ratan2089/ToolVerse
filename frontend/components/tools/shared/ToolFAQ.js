"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ToolFAQ({ faq }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>

      {faq.map((item, index) => (
        <div key={index} className="rounded-xl border">
          <button
            onClick={() => setOpen(open === index ? null : index)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            {item.question}
            <ChevronDown
              className={`transition ${
                open === index ? "rotate-180" : ""
              }`}
            />
          </button>

          {open === index && (
            <div className="border-t p-4 text-gray-600 dark:text-gray-400">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}