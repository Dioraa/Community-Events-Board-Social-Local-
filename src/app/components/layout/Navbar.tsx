import { Home, PlusCircle, CalendarHeart, UserCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import { Container } from './Container';

const navItems = [
  { path: '/', icon: Home, label: 'Discover' },
  { path: '/create', icon: PlusCircle, label: 'Create' },
  { path: '/my-events', icon: CalendarHeart, label: 'My Events' },
  { path: '/profile', icon: UserCircle, label: 'Profile' },
] as const;

export function Navbar({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface pb-safe md:static md:border-b md:border-t-0 md:pb-0 md:shrink-0',
        className,
      )}
    >
      <Container as="div" className="flex h-16 items-center justify-around md:h-14 md:justify-center md:gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:flex-row md:gap-2 md:rounded-lg md:px-4',
                isActive ? 'text-brand' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              <Icon
                className={cn('size-6 md:size-5', isActive && 'stroke-[2.5px]')}
                aria-hidden="true"
              />
              <span className="text-xs md:text-sm">{item.label}</span>
            </Link>
          );
        })}
      </Container>
    </nav>
  );
}
