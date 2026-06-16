import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = 'Search events, locations…',
}: SearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="event-search" className="sr-only">Search events</label>
      <Search
        className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <input
        id="event-search"
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl bg-surface py-3.5 pl-12 pr-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand/40"
      />
    </div>
  );
}
