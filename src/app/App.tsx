import { useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { EventsProvider } from './context/EventsContext';
import { SplashScreen } from './components/SplashScreen';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <EventsProvider>
      <AnimatePresence>
        {showSplash && <SplashScreen key="splash" onDone={() => setShowSplash(false)} />}
      </AnimatePresence>
      {!showSplash && <RouterProvider router={router} />}
    </EventsProvider>
  );
}
