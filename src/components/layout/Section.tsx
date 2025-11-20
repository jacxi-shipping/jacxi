import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
	children: ReactNode;
	className?: string;
}

export default function Section({ children, className }: SectionProps) {
	return (
		<section
			className={cn(
				'dashboard-section relative isolate flex min-h-0 w-full flex-1 overflow-hidden bg-[#020715]',
				className,
			)}
		>
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071122] via-[#030914] to-[#01040a]" />
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.25]"
				style={{
					backgroundImage:
						'radial-gradient(circle at 15% 20%, rgba(56,189,248,0.15) 0%, transparent 35%), radial-gradient(circle at 80% 0%, rgba(124,58,237,0.15) 0%, transparent 30%), linear-gradient(transparent 90%, rgba(255,255,255,0.35) 100%)',
				}}
			/>
			<div className="relative z-10 flex min-h-0 w-full flex-1 justify-center px-3 py-3 sm:px-6 sm:py-4 lg:px-10 lg:py-6">
				<div className="dashboard-scroll flex min-h-0 w-full max-w-[1400px] flex-1 flex-col gap-4">
					{children}
				</div>
			</div>
		</section>
	);
}

