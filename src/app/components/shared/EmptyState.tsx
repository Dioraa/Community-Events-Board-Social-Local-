import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="py-12 text-center">
      <div
        className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-muted"
        aria-hidden="true"
      >
        <Icon className="size-8 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">{title}</p>
      {description && (
        <p className="mt-1 text-sm text-muted-foreground/80">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
