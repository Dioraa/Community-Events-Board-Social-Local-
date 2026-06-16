import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  location: string;
}

export function MapPlaceholder({ location }: MapPlaceholderProps) {
  return (
    <figure
      className="relative aspect-video overflow-hidden rounded-2xl bg-blue-50 shadow-sm"
      aria-label={`Map preview for ${location}`}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100,116,139,0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,116,139,0.4) 1px, transparent 1px)
          `,
          backgroundSize: '2rem 2rem',
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-x-0 top-[38%] h-4 rounded bg-white/70" aria-hidden="true" />
      <div className="absolute inset-x-0 top-[65%] h-2.5 rounded bg-white/50" aria-hidden="true" />
      <div className="absolute inset-y-0 left-[30%] w-4 rounded bg-white/70" aria-hidden="true" />
      <div className="absolute inset-y-0 left-[65%] w-2.5 rounded bg-white/50" aria-hidden="true" />
      <div
        className="absolute left-[40%] top-[10%] h-20 w-20 rounded-xl bg-green-200/60"
        aria-hidden="true"
      />

      <div
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center"
        aria-hidden="true"
      >
        <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-brand shadow-xl">
          <MapPin className="size-5 text-white" />
        </div>
        <div className="mt-1 size-2 rounded-full bg-brand shadow" />
      </div>

      <figcaption
        className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl border border-border bg-surface px-4 py-1.5 text-sm shadow-md"
      >
        {location}
      </figcaption>
    </figure>
  );
}
