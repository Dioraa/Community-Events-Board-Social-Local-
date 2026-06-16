import { Link } from 'react-router';
import { Calendar, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import type { Event } from '../../types/event';
import { CategoryBadge } from './CategoryBadge';

interface FeaturedCarouselProps {
  events: Event[];
}

export function FeaturedCarousel({ events }: FeaturedCarouselProps) {
  if (events.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading">
      <div className="mb-3 flex items-center justify-between px-page">
        <h2 id="featured-heading" className="text-lg">Featured Events</h2>
        <span className="text-sm text-brand">{events.length} events</span>
      </div>

      <ul
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-page pb-2"
        aria-label="Featured events carousel"
      >
        {events.map((event) => {
          const formattedDate = format(new Date(event.date), 'EEE, MMM d');
          return (
            <li key={event.id} className="w-[min(80vw,20rem)] shrink-0 snap-start">
              <Link
                to={`/event/${event.id}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-2xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg transition-transform active:scale-[0.97]">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="size-full object-cover"
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <CategoryBadge category={event.category} />
                    <h3 className="mt-2 line-clamp-1 text-white">{event.title}</h3>
                    <div className="mt-1.5 flex items-center gap-3">
                      <span className="flex items-center gap-1 text-xs text-white/75">
                        <Calendar className="size-3" aria-hidden="true" />
                        {formattedDate}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/75">
                        <MapPin className="size-3" aria-hidden="true" />
                        <span className="line-clamp-1">{event.location}</span>
                      </span>
                    </div>
                  </div>

                  {event.isJoined && (
                    <div className="absolute top-3 right-3 rounded-full bg-white/90 px-2.5 py-1 text-xs text-green-700 backdrop-blur-sm">
                      Going ✓
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
