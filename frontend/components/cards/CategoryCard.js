'use client';

import Link from 'next/link';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { FiArrowRight } from 'react-icons/fi';

export default function CategoryCard({ category }) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="block group h-full"
    >
      <Card
        className="
          h-full
          min-h-[280px]
          flex flex-col
          relative
          overflow-hidden
          p-6
          group-hover:border-brand-500/40
          group-hover:shadow-lg
          transition-all
          duration-300
        "
      >
        {/* Badge */}
        <div className="mb-5">
          <Badge variant="neutral">
            {category.badge}
          </Badge>
        </div>

        {/* Category Name + Tool Count */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <h3
            className="
              text-lg
              font-bold
              text-slate-900
              dark:text-white
              group-hover:text-brand-600
              dark:group-hover:text-brand-400
              transition-colors
            "
          >
            {category.name}
          </h3>

          {/* Tool Count */}
          <span
            className="
              shrink-0
              px-2.5
              py-1
              rounded-lg
              bg-slate-100
              dark:bg-slate-800
              text-xs
              font-semibold
              text-slate-600
              dark:text-slate-300
              whitespace-nowrap
            "
          >
            {category.count} Tools
          </span>
        </div>

        {/* Description */}
        <p
          className="
            text-sm
            text-slate-600
            dark:text-slate-400
            leading-relaxed
            flex-1
          "
        >
          {category.description}
        </p>

        {/* Footer */}
        <div
          className="
            mt-6
            pt-4
            border-t
            border-slate-100
            dark:border-slate-800/80
            flex
            items-center
            justify-end
          "
        >
          <span
            className="
              flex
              items-center
              gap-1.5
              text-sm
              font-semibold
              text-brand-600
              dark:text-brand-400
              group-hover:translate-x-1
              transition-transform
            "
          >
            Explore Category
            <FiArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Card>
    </Link>
  );
}