"use client";

import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type SolutionCardProps = {
	icon: LucideIcon;
	title: string;
	description: string;
	className?: string;
};

export default function SolutionCard({ icon: Icon, title, description, className }: SolutionCardProps) {
	return (
		<motion.div
			whileHover={{ y: -4 }}
			transition={{ duration: 0.3 }}
			className={cn(
				'group relative h-full rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8',
				'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
				'transition-all duration-300',
				className
			)}
		>
			{/* Glowing border effect on hover */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Icon Container */}
			<div className="mb-6 sm:mb-8">
				<div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#020817] border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-500/80 transition-colors duration-300">
					{/* Icon glow effect */}
					<div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
					<Icon className="relative w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10">
				<h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">
					{title}
				</h3>
				<p className="text-sm sm:text-base text-white/80 leading-relaxed">
					{description}
				</p>
			</div>
		</motion.div>
	);
}


