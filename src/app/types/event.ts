export type EventCategory = 'Music' | 'Sports' | 'Workshop' | 'Food';

export type DateFilter = 'All' | 'Today' | 'This Week' | 'This Month';

export interface Event {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  attendees: number;
  maxAttendees?: number;
  host: string;
  isJoined: boolean;
  isBookmarked: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
}

export type CreateEventInput = Omit<Event, 'id' | 'isJoined' | 'attendees' | 'isBookmarked'>;
