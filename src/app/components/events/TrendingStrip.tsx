import { TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
import type { Event } from '../../types/event';

interface TrendingStripProps {
  events: Event[];
}

export function TrendingStrip({ events }: TrendingStripProps) {
  if (events.length === 0) return null;

  return (
    <section aria-labelledby="trending-heading" className="px-page">
      <div className="mb-3 flex items-center gap-2">
        <TrendingUp className="size-5 text-orange-500" aria-hidden="true" />
        <h2 id="trending-heading" className="text-lg">Trending Near You</h2>
      </div>

      <ul
        className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide"
        aria-label="Trending events"
      >
        {events.map((event) => (
          <li key={event.id} className="w-64 shrink-0">
            <Link
              to={`/event/${event.id}`}
              className="flex items-center gap-3 rounded-2xl border border-border bg-surface p-3 shadow-sm transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <img
                src={event.imageUrl}
                alt=""
                className="size-14 shrink-0 rounded-xl object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="line-clamp-1 text-sm">{event.title}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                  {event.location}
                </p>
                <p className="mt-1 text-xs text-orange-500">{event.attendees} attending</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
