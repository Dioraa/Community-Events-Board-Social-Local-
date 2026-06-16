import type { EventCategory } from '../../types/event';
import { categoryStyles } from '../../constants/categories';
import { cn } from '@/lib/utils';

interface CategoryBadgeProps {
  category: EventCategory;
  variant?: 'filled' | 'outline';
}

export function CategoryBadge({ category, variant = 'filled' }: CategoryBadgeProps) {
  const colors = categoryStyles[category];

  if (variant === 'outline') {
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full px-3 py-1 text-xs bg-surface ring-2 ring-inset',
          colors.text,
          colors.ring,
        )}
      >
        {category}
      </span>
    );
  }

  return (
    <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs text-white', colors.bg)}>
      {category}
    </span>
  );
}
