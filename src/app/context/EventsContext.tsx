import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Event, CreateEventInput } from '../types/event';
import { MOCK_EVENTS } from '../data/mockEvents';

interface EventsContextValue {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  addEvent: (event: CreateEventInput) => Promise<void>;
  toggleJoinEvent: (eventId: string) => Promise<void>;
  toggleBookmark: (eventId: string) => Promise<void>;
  getEventById: (eventId: string) => Event | undefined;
  refreshEvents: () => Promise<void>;
}

const EventsContext = createContext<EventsContextValue | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<Event[]>(MOCK_EVENTS);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshEvents = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Replace with API call: const data = await eventsApi.list();
      setEvents(MOCK_EVENTS);
    } catch {
      setError('Failed to load events');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addEvent = useCallback(async (newEvent: CreateEventInput) => {
    const event: Event = {
      ...newEvent,
      id: Date.now().toString(),
      isJoined: false,
      isBookmarked: false,
      attendees: 1,
    };
    setEvents((prev) => [event, ...prev]);
    // Replace with: await eventsApi.create(newEvent);
  }, []);

  const toggleJoinEvent = useCallback(async (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId
          ? {
              ...event,
              isJoined: !event.isJoined,
              attendees: event.isJoined ? event.attendees - 1 : event.attendees + 1,
            }
          : event,
      ),
    );
    // Replace with: await eventsApi.toggleJoin(eventId);
  }, []);

  const toggleBookmark = useCallback(async (eventId: string) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === eventId ? { ...event, isBookmarked: !event.isBookmarked } : event,
      ),
    );
    // Replace with: await eventsApi.toggleBookmark(eventId);
  }, []);

  const getEventById = useCallback(
    (eventId: string) => events.find((event) => event.id === eventId),
    [events],
  );

  return (
    <EventsContext.Provider
      value={{
        events,
        isLoading,
        error,
        addEvent,
        toggleJoinEvent,
        toggleBookmark,
        getEventById,
        refreshEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
}
