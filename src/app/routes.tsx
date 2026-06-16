import { createBrowserRouter } from 'react-router';
import { AppShell } from './components/layout/AppShell';
import { Home } from './pages/Home';
import { EventDetails } from './pages/EventDetails';
import { CreateEvent } from './pages/CreateEvent';
import { MyEvents } from './pages/MyEvents';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Home /> },
      { path: 'event/:id', element: <EventDetails /> },
      { path: 'create', element: <CreateEvent /> },
      { path: 'my-events', element: <MyEvents /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'profile', element: <Profile /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
