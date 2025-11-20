import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Breadcrumb = {
	label: string;
	href?: string;
};

type MetaItem = {
	label: string;
	value: string | number;
	hint?: string;
	tone?: 'cyan' | 'emerald' | 'violet' | 'amber' | 'neutral';
	icon?: ReactNode;
};

interface PageHeaderProps {
	title: string;
	description?: string;
	breadcrumbs?: Breadcrumb[];
	actions?: ReactNode;
	meta?: MetaItem[];
	inlineFilters?: ReactNode;
	className?: string;
}

const toneStyles: Record<NonNullable<MetaItem['tone']>, string> = {
	cyan: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-100',
	emerald: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-100',
	violet: 'border-violet-500/30 bg-violet-500/10 text-violet-100',
	amber: 'border-amber-500/30 bg-amber-500/10 text-amber-100',
	neutral: 'border-white/10 bg-white/5 text-white/70',
};

export default function PageHeader({
	title,
	description,
	breadcrumbs = [],
	actions,
	meta = [],
	inlineFilters,
	className,
}: PageHeaderProps) {
	return (
		<div
			className={cn(
				'relative isolate overflow-hidden rounded-3xl border border-white/5 bg-white/5 px-4 py-5 shadow-[0_25px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl sm:px-6 sm:py-6',
				className,
			)}
		>
			<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
			<div
				className="pointer-events-none absolute inset-0 opacity-[0.25]"
				style={{
					backgroundImage:
						'radial-gradient(circle at 10% 20%, rgba(14,165,233,0.35) 0%, transparent 42%), radial-gradient(circle at 80% 0%, rgba(236,72,153,0.35) 0%, transparent 36%), linear-gradient(transparent 85%, rgba(255,255,255,0.6) 100%)',
				}}
			/>

			<div className="relative z-10 flex flex-col gap-4">
				{breadcrumbs.length > 0 && (
					<nav className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/40">
						{breadcrumbs.map((crumb, index) => (
							<div key={`${crumb.label}-${index}`} className="flex items-center gap-2">
								{crumb.href ? (
									<Link href={crumb.href} className="transition hover:text-white/80">
										{crumb.label}
									</Link>
								) : (
									<span className="text-white/60">{crumb.label}</span>
								)}
								{index < breadcrumbs.length - 1 && <span className="text-white/20">/</span>}
							</div>
						))}
					</nav>
				)}

				<div className="flex flex-wrap items-start gap-4 sm:items-center sm:justify-between">
					<div className="space-y-2">
						<h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-[2.5rem] lg:leading-[1.1]">
							{title}
						</h1>
						{description && <p className="max-w-3xl text-sm text-white/70 sm:text-base">{description}</p>}
					</div>
					{actions && <div className="flex flex-wrap gap-2">{actions}</div>}
				</div>

				{inlineFilters && <div className="mt-1">{inlineFilters}</div>}

				{meta.length > 0 && (
					<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
						{meta.map((item) => (
							<div
								key={item.label}
								className={cn(
									'flex flex-col gap-0.5 rounded-2xl border px-4 py-3 text-white/80 transition hover:translate-y-[-2px]',
									toneStyles[item.tone ?? 'neutral'],
								)}
							>
								<div className="text-[0.72rem] uppercase tracking-[0.14em] text-white/60">{item.label}</div>
								<div className="flex items-center gap-2 text-2xl font-semibold text-white">
									{item.icon}
									<span>{item.value}</span>
								</div>
								{item.hint && <p className="text-xs text-white/60">{item.hint}</p>}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
