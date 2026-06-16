import { useState } from 'react';
import { Settings, ChevronRight, Star, Calendar, Bookmark } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useEvents } from '../context/EventsContext';
import { Container } from '../components/layout/Container';
import { EventList } from '../components/events/EventList';
import { EmptyState } from '../components/shared/EmptyState';
import { IconButton } from '../components/shared/IconButton';
import { cn } from '@/lib/utils';

type Tab = 'going' | 'saved';

export function Profile() {
  const { events } = useEvents();
  const [activeTab, setActiveTab] = useState<Tab>('going');

  const joinedEvents = events.filter((e) => e.isJoined);
  const savedEvents = events.filter((e) => e.isBookmarked);
  const displayedEvents = activeTab === 'going' ? joinedEvents : savedEvents;

  return (
    <div className="min-h-full">
      <header className="bg-brand-gradient px-page pt-page-top pb-10">
        <Container>
          <div className="mb-6 flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div
                className="flex size-20 items-center justify-center rounded-full border-2 border-white/40 bg-white/20 shadow-xl backdrop-blur-sm"
                aria-hidden="true"
              >
                <span className="text-2xl text-white">AC</span>
              </div>
              <div>
                <h1 className="text-2xl text-white">Alex Chen</h1>
                <p className="mt-0.5 text-sm text-white/80">@alexchen · San Francisco</p>
              </div>
            </div>
            <IconButton
              icon={Settings}
              label="Settings"
              className="bg-white/20 text-white backdrop-blur-sm hover:bg-white/30"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Events Going', value: joinedEvents.length, icon: Calendar },
              { label: 'Saved', value: savedEvents.length, icon: Bookmark },
              { label: 'Hosted', value: 2, icon: Star },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl bg-white/15 p-3 text-center backdrop-blur-sm"
              >
                <Icon className="mx-auto mb-1 size-4 text-white/70" aria-hidden="true" />
                <p className="text-xl text-white">{value}</p>
                <p className="text-xs text-white/70">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </header>

      <Container as="main">
        <div
          className="mt-5 flex gap-1 rounded-2xl bg-muted p-1"
          role="tablist"
          aria-label="Profile event tabs"
        >
          {(['going', 'saved'] as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'flex-1 rounded-xl py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                activeTab === tab
                  ? 'bg-surface text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {tab === 'going' ? `Going (${joinedEvents.length})` : `Saved (${savedEvents.length})`}
            </button>
          ))}
        </div>

        <div className="pt-5" role="tabpanel">
          {displayedEvents.length === 0 ? (
            <EmptyState
              icon={activeTab === 'going' ? Calendar : Bookmark}
              title={activeTab === 'going' ? 'No events yet' : 'No saved events'}
              description={
                activeTab === 'going'
                  ? 'Join events to see them here'
                  : 'Bookmark events to save them'
              }
              action={
                <Link
                  to="/"
                  className="inline-block rounded-2xl bg-brand-gradient px-6 py-3 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
                >
                  Discover Events
                </Link>
              }
            />
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <EventList
                events={displayedEvents}
                title={activeTab === 'going' ? 'Going' : 'Saved'}
              />
            </motion.div>
          )}
        </div>

        <section className="pb-4 pt-8" aria-labelledby="settings-heading">
          <h2
            id="settings-heading"
            className="mb-3 px-1 text-sm uppercase tracking-wider text-muted-foreground"
          >
            Settings
          </h2>
          <nav aria-label="Settings" className="overflow-hidden rounded-2xl bg-surface shadow-sm divide-y divide-border">
            {[
              { label: 'Notification Preferences', path: '/notifications' },
              { label: 'Location Settings', path: '/' },
              { label: 'Privacy & Data', path: '/' },
              { label: 'Help & Support', path: '/' },
            ].map(({ label, path }) => (
              <Link
                key={label}
                to={path}
                className="flex items-center justify-between px-4 py-3.5 transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand"
              >
                <span className="text-sm">{label}</span>
                <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
              </Link>
            ))}
          </nav>
        </section>
      </Container>
    </div>
  );
}
