import { Sparkles, Bell } from 'lucide-react';
import { Link } from 'react-router';
import { Container } from './Container';
import { SearchBar } from '../filters/SearchBar';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <header className="bg-brand-gradient px-page pt-page-top pb-8">
      <Container>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="size-7 text-white" aria-hidden="true" />
            <h1 className="text-3xl text-white">LocalVibe</h1>
          </div>
          <Link
            to="/notifications"
            aria-label="View notifications"
            className="relative flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand"
          >
            <Bell className="size-5 text-white" aria-hidden="true" />
            <span
              className="absolute top-1.5 right-1.5 size-2 rounded-full bg-orange-400"
              aria-hidden="true"
            />
          </Link>
        </div>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </Container>
    </header>
  );
}
