import type { EventCategory, DateFilter } from '../../types/event';
import { DateFilterChips } from './DateFilter';
import { CategoryFilter } from './CategoryFilter';

interface FiltersProps {
  selectedCategory: EventCategory | 'All';
  onCategoryChange: (category: EventCategory | 'All') => void;
  dateFilter: DateFilter;
  onDateFilterChange: (filter: DateFilter) => void;
  showCategory?: boolean;
}

export function Filters({
  selectedCategory,
  onCategoryChange,
  dateFilter,
  onDateFilterChange,
  showCategory = true,
}: FiltersProps) {
  return (
    <section aria-label="Event filters" className="space-y-6">
      <DateFilterChips selected={dateFilter} onChange={onDateFilterChange} />
      {showCategory && (
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={onCategoryChange}
        />
      )}
    </section>
  );
}
