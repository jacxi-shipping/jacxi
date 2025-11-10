"use client";

import { motion } from 'framer-motion';
import SolutionCard from './SolutionCard';
import { SOLUTIONS } from './content';
import Section from '@/components/layout/Section';

export default function Solutions() {
	return (
		<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
			{/* Section Title */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true }}
				transition={{ duration: 0.6 }}
				className="mb-12 sm:mb-16 text-center"
			>
				<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
					Our Vehicle Shipping Solutions
				</h2>
			</motion.div>

			{/* Cards Grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
				{SOLUTIONS.map((solution, index) => (
					<motion.div
						key={solution.title}
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-50px" }}
						transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
					>
						<SolutionCard
							icon={solution.icon}
							title={solution.title}
							description={solution.description}
						/>
					</motion.div>
				))}
			</div>
		</Section>
	);
}


