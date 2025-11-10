import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type SectionProps = HTMLAttributes<HTMLElement> & {
  containerClassName?: string;
  padded?: boolean;
};

export default function Section({
  className,
  containerClassName,
  children,
  padded = true,
  ...props
}: SectionProps) {
  return (
    <section className={cn(padded ? 'py-16' : undefined, className)} {...props}>
      <div className={cn('mx-auto max-w-7xl px-6 lg:px-8', containerClassName)}>
        {children}
      </div>
    </section>
  );
}


