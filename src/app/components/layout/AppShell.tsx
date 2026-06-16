import { Outlet, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import { Navbar } from './Navbar';

export function AppShell() {
  const location = useLocation();
  const showNav = !location.pathname.startsWith('/event/');

  return (
    <div className="flex min-h-dvh flex-col">
      <main
        className={cn(
          'order-1 flex-1 md:order-2',
          showNav && 'pb-nav md:pb-0',
        )}
      >
        <Outlet />
      </main>
      {showNav && <Navbar className="order-2 md:order-1" />}
    </div>
  );
}
