import { Search } from 'lucide-react';
import { motion } from 'motion/react';
import type { Event } from '../../types/event';
import { EventCard } from './EventCard';
import { EmptyState } from '../shared/EmptyState';

interface EventListProps {
  events: Event[];
  title: string;
  countLabel?: string;
  onBookmark?: (eventId: string) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function EventList({
  events,
  title,
  countLabel,
  onBookmark,
  emptyTitle = 'No events found',
  emptyDescription = 'Try adjusting your filters',
}: EventListProps) {
  const countText =
    countLabel ??
    `${events.length} ${events.length === 1 ? 'event' : 'events'} found`;

  return (
    <section aria-labelledby="event-list-heading">
      <header className="mb-4">
        <h2 id="event-list-heading" className="text-xl">{title}</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">{countText}</p>
      </header>

      {events.length === 0 ? (
        <EmptyState icon={Search} title={emptyTitle} description={emptyDescription} />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, i) => (
            <motion.li
              key={event.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
            >
              <EventCard event={event} onBookmark={onBookmark} />
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  );
}
