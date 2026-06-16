import type { ButtonHTMLAttributes } from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  label: string;
  size?: 'sm' | 'md';
  variant?: 'ghost' | 'overlay';
}

const sizeClasses = {
  sm: 'size-9',
  md: 'size-10',
};

const iconSizeClasses = {
  sm: 'size-4',
  md: 'size-5',
};

export function IconButton({
  icon: Icon,
  label,
  size = 'md',
  variant = 'ghost',
  className,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        'flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2',
        sizeClasses[size],
        variant === 'overlay'
          ? 'bg-surface-overlay text-foreground shadow-lg backdrop-blur-sm'
          : 'hover:bg-muted',
        className,
      )}
      {...props}
    >
      <Icon className={iconSizeClasses[size]} aria-hidden="true" />
    </button>
  );
}
