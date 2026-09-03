export default function ToolHeader({ tool }) {
  return (
    <div className="space-y-3">
      <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300">
        {tool.category}
      </span>

      <h1 className="text-4xl font-bold">{tool.title}</h1>

      <p className="max-w-3xl text-lg text-gray-600 dark:text-gray-400">
        {tool.description}
      </p>
    </div>
  );
}