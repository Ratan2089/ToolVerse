'use client';

import { useState, useMemo, useEffect } from 'react';
import { tools } from '@/data/tools';

export function useSearch(initialCategory = 'All') {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Keyboard shortcut '/' focus listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      // Category match
      const categoryMatch =
        selectedCategory === 'All' ||
        tool.category.toLowerCase() === selectedCategory.toLowerCase();

      if (!categoryMatch) return false;

      // Query match across title, description, category, tags
      if (!query.trim()) return true;

      const q = query.toLowerCase().trim();
      const inTitle = tool.title.toLowerCase().includes(q);
      const inDesc = tool.description.toLowerCase().includes(q);
      const inCategory = tool.category.toLowerCase().includes(q);
      const inTags = tool.tags.some((tag) => tag.toLowerCase().includes(q));

      return inTitle || inDesc || inCategory || inTags;
    });
  }, [query, selectedCategory]);

  return {
    query,
    setQuery,
    selectedCategory,
    setSelectedCategory,
    filteredTools,
    totalCount: tools.length,
    filteredCount: filteredTools.length,
    clearSearch: () => setQuery(''),
  };
}
