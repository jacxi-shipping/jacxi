import Section from '@/components/layout/Section';
import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type PageHeroProps = HTMLAttributes<HTMLDivElement> & {
  title: string;
  subtitle?: string;
};

export default function PageHero({ title, subtitle, className, ...props }: PageHeroProps) {
  return (
    <Section
      padded
      className={cn('bg-brand-gradient text-brand-white py-24', className)}
      {...props}
    >
      <div className="text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-brand-white">{title}</h1>
        {subtitle ? (
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">{subtitle}</p>
        ) : null}
      </div>
    </Section>
  );
}


