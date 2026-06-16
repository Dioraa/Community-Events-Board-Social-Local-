import { useMemo, useState } from 'react';
import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import type { Event, EventCategory, DateFilter } from '../types/event';

export interface EventFilterState {
  selectedCategory: EventCategory | 'All';
  searchQuery: string;
  dateFilter: DateFilter;
}

export function useEventFilters(events: Event[]) {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('All');

  const filteredEvents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === 'All' || event.category === selectedCategory;

      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        event.location.toLowerCase().includes(query);

      let matchesDate = true;
      if (dateFilter !== 'All') {
        const eventDate = parseISO(event.date);
        if (dateFilter === 'Today') matchesDate = isToday(eventDate);
        else if (dateFilter === 'This Week')
          matchesDate = isThisWeek(eventDate, { weekStartsOn: 1 });
        else if (dateFilter === 'This Month') matchesDate = isThisMonth(eventDate);
      }

      return matchesCategory && matchesSearch && matchesDate;
    });
  }, [events, selectedCategory, searchQuery, dateFilter]);

  const isFiltering =
    searchQuery.trim().length > 0 || selectedCategory !== 'All' || dateFilter !== 'All';

  const featuredEvents = useMemo(() => events.filter((e) => e.isFeatured), [events]);
  const trendingEvents = useMemo(() => events.filter((e) => e.isTrending), [events]);

  return {
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    dateFilter,
    setDateFilter,
    filteredEvents,
    isFiltering,
    featuredEvents,
    trendingEvents,
  };
}
