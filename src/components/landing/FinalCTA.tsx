"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { defaultViewport, makeSmooth } from '@/lib/motion';

export default function FinalCTA() {
	return (
		<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
			<motion.div
				initial={{ opacity: 0, y: 24 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={defaultViewport}
				transition={makeSmooth({ duration: 0.85 })}
				className="relative will-change-transform"
			>
				{/* Background gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-cyan-500/10 to-cyan-500/5 rounded-2xl" />

				{/* Glass card */}
				<div
					className={cn(
						'relative rounded-2xl bg-[#0a1628]/50 backdrop-blur-sm',
						'border border-cyan-500/30',
						'shadow-lg shadow-cyan-500/10',
						'p-8 sm:p-10 md:p-12 lg:p-16'
					)}
				>
					{/* Glowing border effect */}
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-50" />

					<div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
						{/* Text Content */}
						<motion.div
							initial={{ opacity: 0, x: -18 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={defaultViewport}
							transition={makeSmooth({ delay: 0.2, duration: 0.7 })}
							className="flex-1 space-y-4 will-change-transform"
						>
							<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
								Ready to ship with Jacxi?
							</h3>
							<p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
								Government-certified, insured, and VIP-grade handling for your high-value vehicles.
							</p>
						</motion.div>

						{/* CTA Button */}
						<motion.div
							initial={{ opacity: 0, x: 18 }}
							whileInView={{ opacity: 1, x: 0 }}
							viewport={defaultViewport}
							transition={makeSmooth({ delay: 0.35, duration: 0.7 })}
							className="flex-shrink-0 will-change-transform"
						>
							<Button
								size="lg"
								className={cn(
									'group relative overflow-hidden',
									'bg-[#00bfff] text-white hover:bg-[#00a8e6]',
									'shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50',
									'px-8 py-6 text-base sm:text-lg font-semibold',
									'transition-all duration-300',
									'flex items-center gap-2'
								)}
							>
								<span>Request a Quote</span>
								<ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
							</Button>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</Section>
	);
}


