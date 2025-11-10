"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import Section from '@/components/layout/Section';

export default function GlobalReach() {
	return (
		<Section className="relative bg-[#020817] py-16 sm:py-20 lg:py-24 overflow-hidden">
			<div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center min-h-[400px] lg:min-h-[500px]">
				{/* World Map Overlay - Left 2/3 */}
				<div className="absolute inset-0 lg:inset-y-0 lg:left-0 lg:w-2/3 pointer-events-none">
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 1, delay: 0.2 }}
						className="relative w-full h-full"
					>
						<Image
							src="/globe.svg"
							alt="Wireframe world map"
							fill
							className="object-contain object-left lg:object-center opacity-20 lg:opacity-30"
							style={{
								filter: 'drop-shadow(0 0 20px rgba(0, 191, 255, 0.2))',
							}}
							priority
						/>
					</motion.div>
				</div>

				{/* Text Content - Right Side */}
				<motion.div
					initial={{ opacity: 0, x: 40 }}
					whileInView={{ opacity: 1, x: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, delay: 0.3 }}
					className="relative z-10 lg:col-span-2 lg:col-start-2 space-y-4 sm:space-y-6"
				>
					{/* Main Heading */}
					<div className="space-y-2">
						<motion.h2
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
						>
							<span className="block">Global Network</span>
							<span className="block">& Reach</span>
						</motion.h2>
					</div>

					{/* Sub-text */}
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.6 }}
						className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl"
					>
						Fully compliant with US and GCC regulations
					</motion.p>
				</motion.div>
			</div>
		</Section>
	);
}


