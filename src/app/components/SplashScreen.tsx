import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface SplashScreenProps {
  onDone: () => void;
}

export function SplashScreen({ onDone }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, 2600);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-brand-gradient"
      role="status"
      aria-label="Loading LocalVibe"
    >
      <div className="relative flex flex-col items-center gap-5">
        <motion.div
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex size-28 items-center justify-center rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-md"
        >
          <Sparkles className="size-14 text-white" aria-hidden="true" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col items-center gap-2"
        >
          <h1 className="text-5xl tracking-tight text-white">LocalVibe</h1>
          <p className="text-lg text-white/75">Discover events near you</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.4 }}
        className="absolute bottom-20 flex items-center gap-2"
        aria-hidden="true"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            className="size-2 rounded-full bg-white"
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
