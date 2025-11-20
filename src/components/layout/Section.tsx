import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
	children: ReactNode;
	className?: string;
	fullHeight?: boolean;
}

/**
 * Shared dashboard section wrapper.
 * Ensures every dashboard view snaps to the same max width,
 * compact padding, and professional spacing rhythm.
 */
export default function Section({ children, className, fullHeight = false }: SectionProps) {
	return (
		<section
			className={cn(
				'relative flex w-full flex-col gap-3',
				'px-3 py-3 sm:px-4 sm:py-4',
				'max-w-[1360px] lg:max-w-[1440px]',
				'mx-auto',
				fullHeight && 'flex-1 overflow-hidden min-h-0',
				className,
			)}
		>
			{children}
		</section>
	);
}

