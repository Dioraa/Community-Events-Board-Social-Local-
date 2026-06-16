import { Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { useEvents } from '../context/EventsContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { EventList } from '../components/events/EventList';
import { EmptyState } from '../components/shared/EmptyState';

export function MyEvents() {
  const { events } = useEvents();
  const joinedEvents = events.filter((event) => event.isJoined);

  return (
    <div className="min-h-full">
      <PageHeader title="My Events" subtitle="Events you've joined" />

      <Container as="main" className="pt-6">
        {joinedEvents.length === 0 ? (
          <EmptyState
            icon={Sparkles}
            title="No Events Yet"
            description="Start exploring and join events that interest you!"
            action={
              <Link
                to="/"
                className="inline-block rounded-xl bg-brand-gradient px-6 py-3 text-white hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Discover Events
              </Link>
            }
          />
        ) : (
          <EventList
            events={joinedEvents}
            title="Your Events"
            countLabel={`${joinedEvents.length} ${joinedEvents.length === 1 ? 'event' : 'events'}`}
          />
        )}
      </Container>
    </div>
  );
}
