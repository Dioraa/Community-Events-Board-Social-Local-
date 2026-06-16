import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Upload } from 'lucide-react';
import { useEvents } from '../context/EventsContext';
import type { EventCategory } from '../types/event';
import { EVENT_CATEGORIES, getCategoryColor } from '../constants/categories';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { cn } from '@/lib/utils';

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGNvbmNlcnQlMjBjcm93ZCUyMGZlc3RpdmFsfGVufDF8fHx8MTc4MTE4MDY5Nnww&ixlib=rb-4.1.0&q=80&w=1080';

export function CreateEvent() {
  const navigate = useNavigate();
  const { addEvent } = useEvents();

  const [formData, setFormData] = useState({
    title: '',
    category: 'Music' as EventCategory,
    date: '',
    time: '',
    location: '',
    description: '',
    imageUrl: DEFAULT_IMAGE,
    host: '',
    maxAttendees: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addEvent({
      title: formData.title,
      category: formData.category,
      date: formData.date,
      time: formData.time,
      location: formData.location,
      description: formData.description,
      imageUrl: formData.imageUrl,
      host: formData.host,
      maxAttendees: formData.maxAttendees ? parseInt(formData.maxAttendees, 10) : undefined,
    });

    navigate('/');
  };

  return (
    <div className="min-h-full">
      <PageHeader title="Create Event" showBack />

      <Container as="main" className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset>
            <legend className="mb-2 block text-sm">Event Image</legend>
            <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
              <img
                src={formData.imageUrl}
                alt="Event preview"
                className="size-full object-cover"
              />
              <button
                type="button"
                aria-label="Upload event image"
                className="absolute inset-0 flex items-center justify-center bg-black/40 text-white transition-colors hover:bg-black/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                <Upload className="size-8" aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Using default image. Image upload coming soon!
            </p>
          </fieldset>

          <div>
            <label htmlFor="title" className="mb-2 block text-sm">Event Title *</label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Summer Music Festival"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm">Category *</legend>
            <div className="grid grid-cols-2 gap-3">
              {EVENT_CATEGORIES.map((category) => {
                const isSelected = formData.category === category;
                return (
                  <button
                    key={category}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setFormData({ ...formData, category })}
                    className={cn(
                      'rounded-xl py-3 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                      isSelected
                        ? cn(getCategoryColor(category), 'text-white')
                        : 'border border-border bg-surface text-foreground',
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="date" className="mb-2 block text-sm">Date *</label>
              <input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label htmlFor="time" className="mb-2 block text-sm">Time *</label>
              <input
                id="time"
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full rounded-xl border border-border bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="mb-2 block text-sm">Location *</label>
            <input
              id="location"
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Central Park Amphitheater"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label htmlFor="host" className="mb-2 block text-sm">Host Name *</label>
            <input
              id="host"
              type="text"
              required
              value={formData.host}
              onChange={(e) => setFormData({ ...formData, host: e.target.value })}
              placeholder="e.g., Community Events Team"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label htmlFor="maxAttendees" className="mb-2 block text-sm">
              Max Attendees (Optional)
            </label>
            <input
              id="maxAttendees"
              type="number"
              value={formData.maxAttendees}
              onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
              placeholder="Leave empty for unlimited"
              className="w-full rounded-xl border border-border bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <div>
            <label htmlFor="description" className="mb-2 block text-sm">Description *</label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Tell people what your event is about..."
              rows={4}
              className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-brand-gradient py-4 text-white shadow-lg transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus:ring-brand focus-visible:ring-offset-2"
          >
            Create Event
          </button>
        </form>
      </Container>
    </div>
  );
}
