import type { EventCategory } from '../types/event';

export const EVENT_CATEGORIES: EventCategory[] = ['Music', 'Sports', 'Workshop', 'Food'];

export const DATE_FILTERS: Array<'All' | 'Today' | 'This Week' | 'This Month'> = [
  'All',
  'Today',
  'This Week',
  'This Month',
];

export const categoryStyles: Record<
  EventCategory,
  { bg: string; text: string; ring: string }
> = {
  Music: { bg: 'bg-purple-500', text: 'text-purple-500', ring: 'ring-purple-500' },
  Sports: { bg: 'bg-green-500', text: 'text-green-500', ring: 'ring-green-500' },
  Workshop: { bg: 'bg-blue-500', text: 'text-blue-500', ring: 'ring-blue-500' },
  Food: { bg: 'bg-orange-500', text: 'text-orange-500', ring: 'ring-orange-500' },
};

export function getCategoryColor(category: EventCategory): string {
  return categoryStyles[category].bg;
}
