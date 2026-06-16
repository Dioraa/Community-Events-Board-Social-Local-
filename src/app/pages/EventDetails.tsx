import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Calendar, MapPin, Users, Share2, User, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';
import { useEvents } from '../context/EventsContext';
import { CategoryBadge } from '../components/events/CategoryBadge';
import { Container } from '../components/layout/Container';
import { IconButton } from '../components/shared/IconButton';
import { MapPlaceholder } from '../components/shared/MapPlaceholder';

export function EventDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getEventById, toggleJoinEvent, toggleBookmark } = useEvents();

  const event = id ? getEventById(id) : undefined;

  if (!event) {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-page">
        <div className="text-center">
          <p className="text-muted-foreground">Event not found</p>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-4 text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            Go back home
          </button>
        </div>
      </main>
    );
  }

  const formattedDate = format(new Date(event.date), 'EEEE, MMMM d, yyyy');
  const capacityPct = event.maxAttendees
    ? Math.min((event.attendees / event.maxAttendees) * 100, 100)
    : null;

  return (
    <article className="min-h-dvh bg-page pb-32">
      <header className="relative aspect-[16/9] max-h-72 overflow-hidden md:max-h-80">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="size-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
          aria-hidden="true"
        />

        <IconButton
          icon={ArrowLeft}
          label="Go back"
          variant="overlay"
          className="absolute top-4 left-4"
          onClick={() => navigate(-1)}
        />

        <div className="absolute top-4 right-4 flex gap-2">
          <button
            type="button"
            aria-label={event.isBookmarked ? 'Remove bookmark' : 'Bookmark event'}
            onClick={() => toggleBookmark(event.id)}
            className="flex size-10 items-center justify-center rounded-full bg-surface-overlay shadow-lg backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <Bookmark
              className={`size-5 ${event.isBookmarked ? 'fill-brand text-brand' : ''}`}
              aria-hidden="true"
            />
          </button>
          <IconButton icon={Share2} label="Share event" variant="overlay" />
        </div>

        <div className="absolute bottom-4 left-4">
          <CategoryBadge category={event.category} />
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Container className="pt-6">
          <h1 className="mb-4 text-3xl">{event.title}</h1>

          <section aria-label="Host information" className="mb-6 flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-sm">
            <div
              className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand-gradient"
              aria-hidden="true"
            >
              <User className="size-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Hosted by</p>
              <p>{event.host}</p>
            </div>
          </section>

          <section aria-label="Event details" className="mb-6 space-y-3">
            <div className="flex items-start gap-4 rounded-2xl bg-surface p-4 shadow-sm">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-purple-100" aria-hidden="true">
                <Calendar className="size-5 text-brand" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date & Time</p>
                <p>{formattedDate}</p>
                <p className="text-sm text-muted-foreground">{event.time}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl bg-surface p-4 shadow-sm">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pink-100" aria-hidden="true">
                <MapPin className="size-5 text-brand-accent" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Location</p>
                <p>{event.location}</p>
              </div>
            </div>

            <div className="rounded-2xl bg-surface p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-blue-100" aria-hidden="true">
                  <Users className="size-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Attendees</p>
                  <p>
                    {event.attendees} people
                    {event.maxAttendees ? ` (max ${event.maxAttendees})` : ' attending'}
                  </p>
                </div>
              </div>
              {capacityPct !== null && (
                <div className="mt-3">
                  <div
                    className="h-2 overflow-hidden rounded-full bg-muted"
                    role="progressbar"
                    aria-valuenow={capacityPct}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Event capacity"
                  >
                    <div
                      className={`h-full rounded-full transition-all ${
                        capacityPct >= 90 ? 'bg-red-500' : capacityPct >= 70 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${capacityPct}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {event.maxAttendees! - event.attendees > 0
                      ? `${event.maxAttendees! - event.attendees} spots remaining`
                      : 'Event is full'}
                  </p>
                </div>
              )}
            </div>
          </section>

          <section className="mb-6">
            <h2 className="mb-3 text-xl">About This Event</h2>
            <p className="leading-relaxed text-muted-foreground">{event.description}</p>
          </section>

          <section className="mb-6">
            <h2 className="mb-3 text-xl">Location Preview</h2>
            <MapPlaceholder location={event.location} />
          </section>
        </Container>
      </motion.div>

      <footer className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/95 px-page py-4 pb-safe backdrop-blur-sm">
        <Container>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              <span className="text-foreground">{event.attendees}</span> people going
            </p>
            {event.isJoined && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs text-green-600">
                You're going! ✓
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => toggleJoinEvent(event.id)}
            className={`w-full rounded-2xl py-4 text-white transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 ${
              event.isJoined
                ? 'bg-neutral-700 hover:bg-neutral-800'
                : 'bg-brand-gradient shadow-lg hover:opacity-90'
            }`}
          >
            {event.isJoined ? 'Leave Event' : "I'm Going →"}
          </button>
        </Container>
      </footer>
    </article>
  );
}
