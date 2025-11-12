"use client";

import { motion } from 'framer-motion';
import ProcessStep from './ProcessStep';
import { STEPS } from './content';
import Section from '@/components/layout/Section';
import { defaultViewport, fadeInUp, makeSmooth, stagger } from '@/lib/motion';

export default function HowItWorks() {
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
				<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white">
					How It Works
				</h2>
			</motion.div>

			{/* Steps Container */}
			<div className="relative">
				{/* Connecting Dashed Line - Desktop only */}
				<div className="hidden md:block absolute top-[60px] left-0 right-0 h-0.5">
					<svg className="w-full h-full" preserveAspectRatio="none">
						<line
							x1="0%"
							y1="0"
							x2="100%"
							y2="0"
							stroke="currentColor"
							strokeWidth="2"
							strokeDasharray="8 8"
							className="text-cyan-500/40"
						/>
					</svg>
				</div>

				{/* Steps Grid */}
				<motion.div
					className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-4 lg:gap-8 items-start"
					variants={stagger({ staggerChildren: 0.14, delayChildren: 0.12 })}
					initial="hidden"
					whileInView="show"
					viewport={defaultViewport}
				>
					{STEPS.map((step, index) => (
						<motion.div
							key={step.label}
							variants={fadeInUp({ distance: 26, delay: index * 0.02 })}
							className="relative will-change-transform"
						>
							{/* Connector line for mobile/tablet */}
							{index < STEPS.length - 1 && (
								<div className="md:hidden absolute top-[60px] left-1/2 w-full h-0.5">
									<svg className="w-full h-full" preserveAspectRatio="none">
										<line
											x1="0%"
											y1="0"
											x2="100%"
											y2="0"
											stroke="currentColor"
											strokeWidth="2"
											strokeDasharray="6 6"
											className="text-cyan-500/30"
										/>
									</svg>
								</div>
							)}
							<ProcessStep icon={step.icon} label={step.label} index={index} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</Section>
	);
}


