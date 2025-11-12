"use client";

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Section from '@/components/layout/Section';
import { TESTIMONIALS } from './content';
import { cn } from '@/lib/utils';
import { defaultViewport, fadeInUp, hoverSpring, makeSmooth, stagger } from '@/lib/motion';

export default function Testimonials() {
	return (
		<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
			{/* Section Title */}
			<motion.div
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={defaultViewport}
				transition={makeSmooth({ duration: 0.7 })}
				className="text-center mb-12 sm:mb-16 will-change-transform"
			>
				<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
					What Clients Say
				</h2>
				<p className="text-lg sm:text-xl text-white/70">
					Trusted by premium dealers and VIP clients
				</p>
			</motion.div>

			{/* Testimonials Grid */}
			<motion.div
				className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
				variants={stagger({ staggerChildren: 0.18, delayChildren: 0.1 })}
				initial="hidden"
				whileInView="show"
				viewport={defaultViewport}
			>
				{TESTIMONIALS.map((testimonial, index) => (
					<motion.div
						key={testimonial.name}
						variants={fadeInUp({ distance: 24, delay: index * 0.02 })}
						className="group will-change-transform"
					>
						<motion.div
							whileHover={{ y: -4 }}
							transition={hoverSpring}
							className={cn(
								'relative h-full rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8',
								'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
								'transition-all duration-300'
							)}
						>
							{/* Glowing border effect on hover */}
							<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

							{/* Quote Icon */}
							<div className="mb-4 sm:mb-6">
								<Quote className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400/60" />
							</div>

							{/* Quote Text */}
							<blockquote className="relative z-10 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-6 sm:mb-8">
								&ldquo;{testimonial.quote}&rdquo;
							</blockquote>

							{/* Author Info */}
							<div className="relative z-10 pt-6 border-t border-white/10">
								<p className="text-base sm:text-lg font-semibold text-white mb-1">
									{testimonial.name}
								</p>
								<p className="text-sm sm:text-base text-white/70">
									{testimonial.title}
								</p>
							</div>
						</motion.div>
					</motion.div>
				))}
			</motion.div>
		</Section>
	);
}


