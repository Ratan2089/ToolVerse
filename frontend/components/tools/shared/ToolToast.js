"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function ToolToast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-5 right-5 z-50 rounded-xl bg-green-600 px-4 py-3 text-white shadow-lg"
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}