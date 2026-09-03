import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind classes cleanly with clsx logic
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
