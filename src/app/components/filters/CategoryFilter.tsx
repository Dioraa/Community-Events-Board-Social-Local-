import type { EventCategory } from '../../types/event';
import { EVENT_CATEGORIES, getCategoryColor } from '../../constants/categories';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  selectedCategory: EventCategory | 'All';
  onSelectCategory: (category: EventCategory | 'All') => void;
}

const categories: (EventCategory | 'All')[] = ['All', ...EVENT_CATEGORIES];

export function CategoryFilter({ selectedCategory, onSelectCategory }: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
      role="group"
      aria-label="Filter by category"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        const isAll = category === 'All';

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onSelectCategory(category)}
            className={cn(
              'whitespace-nowrap rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
              isSelected
                ? isAll
                  ? 'bg-foreground text-background'
                  : cn(getCategoryColor(category as EventCategory), 'text-white')
                : 'bg-muted text-foreground hover:bg-muted/80',
            )}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
