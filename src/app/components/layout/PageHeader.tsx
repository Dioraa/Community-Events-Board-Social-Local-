import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { cn } from '@/lib/utils';
import { Container } from './Container';
import { IconButton } from '../shared/IconButton';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  showBack = false,
  actions,
  className,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className={cn('bg-brand-gradient px-page pt-page-top pb-6', className)}>
      <Container>
        <div className="flex items-center gap-4">
          {showBack && (
            <IconButton
              icon={ArrowLeft}
              label="Go back"
              variant="overlay"
              className="bg-white/20 text-white shadow-none backdrop-blur-sm"
              onClick={() => navigate(-1)}
            />
          )}
          <div className="min-w-0 flex-1">
            <h1 className="text-2xl text-white">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-white/80">{subtitle}</p>}
          </div>
          {actions}
        </div>
      </Container>
    </header>
  );
}
