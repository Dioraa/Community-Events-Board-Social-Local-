import { Calendar, MapPin, Users, Bookmark } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router';
import type { Event } from '../../types/event';
import { CategoryBadge } from './CategoryBadge';

interface EventCardProps {
  event: Event;
  onBookmark?: (eventId: string) => void;
}

export function EventCard({ event, onBookmark }: EventCardProps) {
  const formattedDate = format(new Date(event.date), 'EEE, MMM d');
  const spotsLeft = event.maxAttendees ? event.maxAttendees - event.attendees : null;
  const isAlmostFull = spotsLeft !== null && spotsLeft <= 5;

  return (
    <article className="overflow-hidden rounded-2xl bg-surface shadow-md transition-shadow hover:shadow-lg">
      <Link
        to={`/event/${event.id}`}
        className="block active:scale-[0.98] transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 rounded-2xl"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="size-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 right-3">
            <CategoryBadge category={event.category} />
          </div>
          {event.isJoined && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
                Going ✓
              </span>
            </div>
          )}
          {event.isTrending && !event.isJoined && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center rounded-full bg-orange-500/90 px-3 py-1 text-xs text-white">
                Trending
              </span>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 flex-1 text-lg">{event.title}</h3>
            {onBookmark && (
              <button
                type="button"
                aria-label={event.isBookmarked ? 'Remove bookmark' : 'Bookmark event'}
                className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onBookmark(event.id);
                }}
              >
                <Bookmark
                  className={
                    event.isBookmarked
                      ? 'size-4 fill-brand text-brand'
                      : 'size-4 text-muted-foreground'
                  }
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          <ul className="mt-2 space-y-2 text-sm text-muted-foreground" aria-label="Event details">
            <li className="flex items-center gap-2">
              <Calendar className="size-4 shrink-0" aria-hidden="true" />
              <span>{formattedDate} at {event.time}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" aria-hidden="true" />
              <span className="line-clamp-1">{event.location}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Users className="size-4 shrink-0" aria-hidden="true" />
                <span>
                  {event.attendees}
                  {event.maxAttendees ? ` / ${event.maxAttendees}` : ''} attending
                </span>
              </span>
              {isAlmostFull && (
                <span className="rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-600">
                  {spotsLeft} spots left!
                </span>
              )}
            </li>
          </ul>

          <footer className="mt-3 border-t border-border pt-3">
            <p className="text-xs text-muted-foreground">
              Hosted by <span className="text-foreground">{event.host}</span>
            </p>
          </footer>
        </div>
      </Link>
    </article>
  );
}
