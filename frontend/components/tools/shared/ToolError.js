export default function ToolError({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700 dark:border-red-700 dark:bg-red-950 dark:text-red-300">
      {message}
    </div>
  );
}