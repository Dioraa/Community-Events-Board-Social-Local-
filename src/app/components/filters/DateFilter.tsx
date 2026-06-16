import type { DateFilter } from '../../types/event';
import { DATE_FILTERS } from '../../constants/categories';
import { cn } from '@/lib/utils';

interface DateFilterProps {
  selected: DateFilter;
  onChange: (filter: DateFilter) => void;
}

export function DateFilterChips({ selected, onChange }: DateFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      role="group"
      aria-label="Filter by date"
    >
      {DATE_FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          aria-pressed={selected === filter}
          onClick={() => onChange(filter)}
          className={cn(
            'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
            selected === filter
              ? 'border-brand bg-brand text-white'
              : 'border-border bg-surface text-muted-foreground hover:border-muted-foreground/30',
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
