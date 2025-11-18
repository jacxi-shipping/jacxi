"use client";

import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type StatsCardProps = {
	icon: LucideIcon;
	title: string;
	value: string | number;
	subtitle?: string;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	className?: string;
	delay?: number;
};

export default function StatsCard({ 
	icon: Icon, 
	title, 
	value, 
	subtitle, 
	trend,
	className,
	delay = 0
}: StatsCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6, delay }}
			whileHover={{ y: -4 }}
			className={cn(
				'group relative rounded-lg sm:rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-3 sm:p-6 md:p-8',
				'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
				'transition-all duration-300',
				className
			)}
		>
			{/* Glowing border effect on hover */}
			<div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<div className="relative z-10">
				{/* Icon and Title */}
				<div className="flex items-start justify-between mb-2 sm:mb-4 md:mb-6">
					<div className="relative">
						<div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-[#020817] border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-500/80 transition-colors duration-300">
							{/* Icon glow effect */}
							<div className="absolute inset-0 rounded-lg sm:rounded-xl bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
							<Icon className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
						</div>
					</div>
					{trend && (
						<div className={cn(
							'flex items-center gap-0.5 sm:gap-1 text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full',
							trend.isPositive ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'
						)}>
							<span>{trend.isPositive ? '↑' : '↓'}</span>
							<span>{Math.abs(trend.value)}%</span>
						</div>
					)}
				</div>

				{/* Value */}
				<div className="mb-1 sm:mb-2">
					<p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
						{value}
					</p>
				</div>

				{/* Title */}
				<p className="text-xs sm:text-sm md:text-base text-white/80 font-medium mb-0.5 sm:mb-1 line-clamp-1">
					{title}
				</p>

				{/* Subtitle */}
				{subtitle && (
					<p className="text-[10px] sm:text-xs md:text-sm text-white/60 line-clamp-1">
						{subtitle}
					</p>
				)}
			</div>
		</motion.div>
	);
}

