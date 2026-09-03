export default function ToolEmptyState({ title, description }) {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center">
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );
}