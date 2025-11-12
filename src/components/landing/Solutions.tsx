"use client";

import { motion } from 'framer-motion';
import SolutionCard from './SolutionCard';
import { SOLUTIONS } from './content';
import Section from '@/components/layout/Section';
import { defaultViewport, fadeInUp, makeSmooth, stagger } from '@/lib/motion';

export default function Solutions() {
	return (
		<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
			{/* Section Title */}
			<motion.div
				initial={{ opacity: 0, y: 18 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={defaultViewport}
				transition={makeSmooth({ duration: 0.7 })}
				className="mb-12 sm:mb-16 text-center will-change-transform"
			>
				<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
					Our Vehicle Shipping Solutions
				</h2>
			</motion.div>

			{/* Cards Grid */}
			<motion.div
				variants={stagger({ staggerChildren: 0.16, delayChildren: 0.12 })}
				initial="hidden"
				whileInView="show"
				viewport={defaultViewport}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
			>
				{SOLUTIONS.map((solution, index) => (
					<motion.div
						key={solution.title}
						variants={fadeInUp({ distance: 24, delay: index * 0.02 })}
						className="will-change-transform"
					>
						<SolutionCard
							icon={solution.icon}
							title={solution.title}
							description={solution.description}
						/>
					</motion.div>
				))}
			</motion.div>
		</Section>
	);
}


