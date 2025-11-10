"use client";

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import Link from 'next/link';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { TESTIMONIALS } from '@/components/landing/content';
import { cn } from '@/lib/utils';

export default function TestimonialsPage() {
	return (
		<>
			{/* Hero Section */}
			<section className="relative min-h-[40vh] overflow-hidden bg-[#020817] text-white">
				{/* Background gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />

				{/* Content */}
				<div className="relative z-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-24">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						className="text-center max-w-3xl mx-auto space-y-6"
					>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
							What Our Clients Say
						</h1>
						<p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed">
							Trusted by premium dealers and VIP clients worldwide
						</p>
					</motion.div>
				</div>
			</section>

			{/* Testimonials Grid */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{TESTIMONIALS.map((testimonial, index) => (
						<motion.div
							key={testimonial.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
							className="group"
						>
							<motion.div
								whileHover={{ y: -4 }}
								transition={{ duration: 0.3 }}
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
								<blockquote className="relative z-10 text-base sm:text-lg text-white/90 leading-relaxed mb-6 sm:mb-8">
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
				</div>
			</Section>

			{/* Call to Action */}
			<Section className="bg-[#020817] py-16 sm:py-20">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="text-center max-w-3xl mx-auto space-y-6"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
						Ready to Experience Excellence?
					</h2>
					<p className="text-lg sm:text-xl text-white/80 leading-relaxed">
						Join our satisfied clients and experience premium vehicle shipping services
					</p>
					<div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
						<Link href="/contact">
							<Button
								size="lg"
								className="bg-[#00bfff] text-white hover:bg-[#00a8e6] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 px-8 py-6 text-base sm:text-lg font-semibold"
							>
								Get in Touch
							</Button>
						</Link>
						<Link href="/services">
							<Button
								size="lg"
								variant="outline"
								className="border border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-base sm:text-lg font-semibold"
							>
								View Services
							</Button>
						</Link>
					</div>
				</motion.div>
			</Section>
		</>
	);
}