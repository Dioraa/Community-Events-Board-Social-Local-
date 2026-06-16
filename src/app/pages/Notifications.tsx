import { useNavigate } from 'react-router';
import { CheckCircle, Calendar, MapPin, Bell } from 'lucide-react';
import { motion } from 'motion/react';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';

interface Notification {
  id: string;
  type: 'rsvp' | 'reminder' | 'nearby' | 'update';
  title: string;
  body: string;
  time: string;
  read: boolean;
  eventId?: string;
}

const notifications: Notification[] = [
  {
    id: '1',
    type: 'rsvp',
    title: 'RSVP Confirmed!',
    body: "You're going to Weekend Soccer Match on June 14 at Riverside Sports Complex.",
    time: '2 hours ago',
    read: false,
    eventId: '2',
  },
  {
    id: '2',
    type: 'reminder',
    title: 'Event Tomorrow',
    body: "Morning Yoga in the Park starts at 7:00 AM tomorrow. Don't forget your mat!",
    time: '5 hours ago',
    read: false,
    eventId: '5',
  },
  {
    id: '3',
    type: 'nearby',
    title: 'New Event Near You',
    body: 'Street Food Festival just added 12 new vendors. 456 people are attending!',
    time: '1 day ago',
    read: true,
    eventId: '4',
  },
  {
    id: '4',
    type: 'update',
    title: 'Almost Full!',
    body: "Weekend Soccer Match is 82% full with only 4 spots left. You're already in!",
    time: '1 day ago',
    read: true,
    eventId: '2',
  },
  {
    id: '5',
    type: 'nearby',
    title: 'Trending in Your Area',
    body: 'Farmers Market Saturday is trending with 312 attendees. Check it out!',
    time: '2 days ago',
    read: true,
    eventId: '7',
  },
  {
    id: '6',
    type: 'rsvp',
    title: 'Event Reminder',
    body: 'Summer Music Festival is in 9 days. Invite friends and make it a group!',
    time: '3 days ago',
    read: true,
    eventId: '1',
  },
];

const iconMap = {
  rsvp: CheckCircle,
  reminder: Calendar,
  nearby: MapPin,
  update: Bell,
};

const colorMap = {
  rsvp: 'bg-green-100 text-green-600',
  reminder: 'bg-purple-100 text-purple-600',
  nearby: 'bg-blue-100 text-blue-600',
  update: 'bg-orange-100 text-orange-600',
};

export function Notifications() {
  const navigate = useNavigate();
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-full">
      <PageHeader
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : undefined}
        showBack
      />

      <Container as="main" className="space-y-3 pt-4">
        <ul aria-label="Notifications list" className="space-y-3">
          {notifications.map((notif, i) => {
            const Icon = iconMap[notif.type];
            const colorClass = colorMap[notif.type];
            return (
              <motion.li
                key={notif.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => notif.eventId && navigate(`/event/${notif.eventId}`)}
                  className={`flex w-full gap-4 rounded-2xl p-4 text-left shadow-sm transition-transform active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand ${
                    notif.read
                      ? 'bg-surface'
                      : 'border border-purple-100 bg-purple-50'
                  }`}
                >
                  <div
                    className={`flex size-11 shrink-0 items-center justify-center rounded-full ${colorClass}`}
                    aria-hidden="true"
                  >
                    <Icon className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${notif.read ? '' : 'text-purple-900'}`}>
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span
                          className="mt-1.5 size-2 shrink-0 rounded-full bg-brand"
                          aria-label="Unread"
                        />
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {notif.body}
                    </p>
                    <p className="mt-1.5 text-xs text-muted-foreground/80">{notif.time}</p>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
