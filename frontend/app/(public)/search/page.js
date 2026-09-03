'use client';

import SearchBar from '@/components/shared/SearchBar';
import SectionHeading from '@/components/shared/SectionHeading';
import ToolCard from '@/components/cards/ToolCard';
import EmptyState from '@/components/ui/EmptyState';
import { useSearch } from '@/hooks/useSearch';
import { FiSearch, FiZap, FiCommand } from 'react-icons/fi';

export default function GlobalSearchPage() {
  const {
    query,
    setQuery,
    filteredTools,
    filteredCount,
    clearSearch,
  } = useSearch();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
      <SectionHeading
        badge="Instant Search Engine"
        title="Search ToolVerse Registry"
        subtitle="Type any keyword, tool name, or tag. Filtering happens instantly client-side with 0ms latency."
        centered
      />

      <div className="max-w-2xl mx-auto space-y-4">
        <SearchBar
          value={query}
          onChange={setQuery}
          onClear={clearSearch}
          placeholder="Search tools... (Press '/' key anywhere to focus)"
          size="lg"
          autoFocus
        />

        <div className="flex items-center justify-between text-xs text-slate-500 px-2 font-medium">
          <span className="flex items-center gap-1">
            <FiCommand className="w-3.5 h-3.5 text-brand-500" />
            Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 rounded"> / </kbd> to jump to search input
          </span>
          <span>{filteredCount} results found</span>
        </div>
      </div>

      {/* Results Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No results for "${query}"`}
          description="Try searching for terms like 'JSON', 'JWT', 'Password', 'QR', 'Base64', or 'Format'."
          onReset={clearSearch}
        />
      )}
    </div>
  );
}
