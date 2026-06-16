import { useNavigate } from 'react-router';
import { Home } from 'lucide-react';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-dvh items-center justify-center bg-page px-page">
      <div className="text-center">
        <div
          className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-brand-gradient"
          aria-hidden="true"
        >
          <span className="text-5xl">🤔</span>
        </div>
        <h1 className="mb-3 text-3xl">Page Not Found</h1>
        <p className="mb-8 text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-gradient px-6 py-3 text-white shadow-lg transition-all hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <Home className="size-5" aria-hidden="true" />
          Back to Home
        </button>
      </div>
    </main>
  );
}
