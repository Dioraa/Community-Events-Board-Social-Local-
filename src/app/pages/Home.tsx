import { motion } from 'motion/react';
import { useEvents } from '../context/EventsContext';
import { useEventFilters } from '../hooks/useEventFilters';
import { Hero } from '../components/layout/Hero';
import { Container } from '../components/layout/Container';
import { DateFilterChips } from '../components/filters/DateFilter';
import { CategoryFilter } from '../components/filters/CategoryFilter';
import { FeaturedCarousel } from '../components/events/FeaturedCarousel';
import { TrendingStrip } from '../components/events/TrendingStrip';
import { EventList } from '../components/events/EventList';

export function Home() {
  const { events, toggleBookmark } = useEvents();
  const {
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
  } = useEventFilters(events);

  const listTitle =
    selectedCategory === 'All' ? 'All Events' : `${selectedCategory} Events`;

  return (
    <div className="min-h-full">
      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <Container className="space-y-6 pt-5">
        <DateFilterChips selected={dateFilter} onChange={setDateFilter} />

        {!isFiltering && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <FeaturedCarousel events={featuredEvents} />
          </motion.div>
        )}

        {!isFiltering && trendingEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="pt-2"
          >
            <TrendingStrip events={trendingEvents} />
          </motion.div>
        )}

        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <EventList
          events={filteredEvents}
          title={listTitle}
          onBookmark={toggleBookmark}
        />
      </Container>
    </div>
  );
}
