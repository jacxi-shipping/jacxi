"use client";

import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { defaultViewport, hoverSpring, makeSmooth } from '@/lib/motion';

type ProcessStepProps = {
	icon: LucideIcon;
	label: string;
	index?: number;
};

export default function ProcessStep({ icon: Icon, label, index = 0 }: ProcessStepProps) {
	return (
		<div className="flex flex-col items-center text-center relative z-10">
			{/* Icon Circle */}
			<motion.div
				whileHover={{ scale: 1.05 }}
				initial={{ scale: 0.88, opacity: 0 }}
				whileInView={{ scale: 1, opacity: 1 }}
				viewport={defaultViewport}
				transition={{ ...hoverSpring, delay: index * 0.12 }}
				className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center bg-[#020817] border-2 border-cyan-500/60 group hover:border-cyan-400 transition-all duration-300 will-change-transform"
			>
				{/* Glow effect */}
				<div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
				<Icon className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
			</motion.div>

			{/* Label */}
			<motion.div
				initial={{ opacity: 0, y: 8 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={defaultViewport}
				transition={makeSmooth({ delay: index * 0.12 + 0.18, duration: 0.6 })}
				className="mt-4 sm:mt-6 will-change-transform"
			>
				<span className="text-sm sm:text-base md:text-lg font-medium text-white/90 leading-tight">
					{label}
				</span>
			</motion.div>
		</div>
	);
}


