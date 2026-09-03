'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Card({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={cn(
        'glass-card rounded-2xl p-6 transition-all duration-200 shadow-sm border border-slate-200/80 dark:border-slate-800/80',
        hoverEffect && 'hover:shadow-xl hover:border-brand-500/30 dark:hover:border-brand-500/30 hover:bg-white/95 dark:hover:bg-slate-900/90 cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
