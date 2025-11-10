"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, Ship, Globe2 } from 'lucide-react';

export default function Hero() {
	return (
		<section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-[#020817] text-white">
			{/* Subtle geometric grid pattern background */}
			<div className="absolute inset-0 opacity-[0.03]">
				<svg className="w-full h-full" preserveAspectRatio="none">
					<defs>
						<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
							<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" className="text-cyan-400" />
				</svg>
			</div>

			{/* Subtle blue gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />

			{/* Right side visuals - Car + Map */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute right-0 top-0 bottom-0 w-full lg:w-[55%] xl:w-[60%]">
					{/* Gradient overlay for text readability */}
					<div className="absolute inset-0 bg-gradient-to-l from-[#020817] via-[#020817]/95 lg:via-[#020817]/80 to-transparent z-10" />
					
					{/* Holographic wireframe world map */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 1.2, delay: 0.3 }}
						className="absolute inset-0 z-[1]"
					>
						<Image
							src="/globe.svg"
							alt="Wireframe world map"
							fill
							priority
							className="object-contain object-center opacity-30 mix-blend-screen"
							style={{ filter: 'drop-shadow(0 0 20px rgba(0, 191, 255, 0.3))' }}
						/>
					</motion.div>

					{/* Luxury car image */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.5 }}
						className="absolute inset-0 z-[2]"
					>
						<Image
							src="/hero-bentley.png"
							alt="Luxury blue sports car"
							fill
							priority
							className="object-contain object-bottom-right lg:object-center"
							sizes="(max-width: 1024px) 100vw, 55vw"
							style={{ filter: 'drop-shadow(0 0 30px rgba(0, 191, 255, 0.4))' }}
						/>
					</motion.div>

					{/* Glowing blue light trails effect */}
					<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cyan-500/20 via-cyan-500/10 to-transparent blur-2xl z-[1]" />
				</div>
			</div>

			{/* Main content container */}
			<div className="relative z-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20 lg:py-28">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[70vh] lg:min-h-[80vh]">
					{/* Left side - Text content */}
					<motion.div
						initial={{ opacity: 0, x: -40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
						className="space-y-6 sm:space-y-8 max-w-2xl"
					>
						{/* Headline */}
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.2 }}
							className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white"
						>
							Government-Certified Vehicle Shipping from the USA to the Middle East
						</motion.h1>

						{/* Sub-headline */}
						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.4 }}
							className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl"
						>
							Safe, Insured, and VIP-grade handling for your high-value vehicles
						</motion.p>

						{/* CTA Button */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="pt-4"
						>
							<motion.div
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.98 }}
								transition={{ type: "spring", stiffness: 400, damping: 17 }}
								className="relative inline-block"
							>
								<Button
									size="lg"
									className="group relative overflow-hidden bg-[#00bfff] text-white hover:bg-[#00a8e6] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/60 transition-all duration-300 px-8 py-6 text-base sm:text-lg font-semibold"
									style={{
										boxShadow: '0 0 20px rgba(0, 191, 255, 0.4), 0 0 40px rgba(0, 191, 255, 0.2), inset 0 0 20px rgba(255, 255, 255, 0.1)',
									}}
								>
									<span className="relative z-10 flex items-center gap-2">
										Request a Quote
										<motion.span
											animate={{ x: [0, 4, 0] }}
											transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
										>
											→
										</motion.span>
									</span>
									{/* Shimmer effect */}
									<div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
									{/* Glow pulse */}
									<div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</Button>
							</motion.div>
						</motion.div>
					</motion.div>

					{/* Right side spacer for desktop */}
					<div className="hidden lg:block" />
				</div>
			</div>

			{/* Holographic UI Overlays - Desktop only */}
			<div className="hidden lg:block">
				{/* US & GCC Compliance Card */}
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.6, delay: 0.8 }}
					whileHover={{ 
						scale: 1.05, 
						y: -5,
						rotateX: 5,
						rotateY: -5,
						transition: { duration: 0.3 }
					}}
					className="group absolute right-12 top-32 glass-dark border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md shadow-lg shadow-cyan-500/20 cursor-pointer"
					style={{
						transformStyle: 'preserve-3d',
						perspective: '1000px',
					}}
				>
					{/* Hover glow effect */}
					<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
					{/* Neon border on hover */}
					<div className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-300" 
						style={{
							boxShadow: '0 0 20px rgba(0, 191, 255, 0)',
						}}
					/>
					<div className="relative z-10">
						<div className="flex items-center gap-3">
							<motion.div
								whileHover={{ rotate: 360, scale: 1.2 }}
								transition={{ duration: 0.6, ease: "easeInOut" }}
								className="relative"
							>
								<Globe2 
									className="w-5 h-5 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300" 
									style={{
										filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.5))',
									}}
								/>
								<div className="absolute inset-0 bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</motion.div>
							<div className="text-sm">
								<p className="text-white font-semibold group-hover:text-cyan-100 transition-colors duration-300">US & GCC</p>
								<p className="text-white/70 text-xs group-hover:text-white/80 transition-colors duration-300">Compliance Verified</p>
							</div>
						</div>
						<div className="mt-3 h-1 w-full rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 animate-shimmer group-hover:via-cyan-400/80 transition-all duration-300" />
					</div>
				</motion.div>

				{/* Insured & Tracked Card */}
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.6, delay: 1 }}
					whileHover={{ 
						scale: 1.05, 
						y: -5,
						rotateX: 5,
						rotateY: 5,
						transition: { duration: 0.3 }
					}}
					className="group absolute right-40 top-72 glass-dark border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md shadow-lg shadow-cyan-500/20 cursor-pointer"
					style={{
						transformStyle: 'preserve-3d',
						perspective: '1000px',
					}}
				>
					{/* Hover glow effect */}
					<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
					{/* Neon border on hover */}
					<div className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-300" 
						style={{
							boxShadow: '0 0 20px rgba(0, 191, 255, 0)',
						}}
					/>
					<div className="relative z-10">
						<div className="flex items-center gap-3">
							<motion.div
								whileHover={{ scale: 1.3, rotate: [0, -10, 10, -10, 0] }}
								transition={{ duration: 0.5, ease: "easeInOut" }}
								className="relative"
							>
								<ShieldCheck 
									className="w-5 h-5 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300" 
									style={{
										filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.5))',
									}}
								/>
								<div className="absolute inset-0 bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</motion.div>
							<div className="text-sm">
								<p className="text-white font-semibold group-hover:text-cyan-100 transition-colors duration-300">Insured & Tracked</p>
								<p className="text-white/70 text-xs group-hover:text-white/80 transition-colors duration-300">Real-time visibility</p>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Sea / Air Freight Card */}
				<motion.div
					initial={{ opacity: 0, y: 20, scale: 0.95 }}
					animate={{ opacity: 1, y: 0, scale: 1 }}
					transition={{ duration: 0.6, delay: 1.2 }}
					whileHover={{ 
						scale: 1.05, 
						y: -5,
						rotateX: -5,
						rotateY: 5,
						transition: { duration: 0.3 }
					}}
					className="group absolute right-20 bottom-32 glass-dark border border-cyan-500/30 rounded-xl p-4 backdrop-blur-md shadow-lg shadow-cyan-500/20 cursor-pointer"
					style={{
						transformStyle: 'preserve-3d',
						perspective: '1000px',
					}}
				>
					{/* Hover glow effect */}
					<div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
					{/* Neon border on hover */}
					<div className="absolute inset-0 rounded-xl border-2 border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-300" 
						style={{
							boxShadow: '0 0 20px rgba(0, 191, 255, 0)',
						}}
					/>
					<div className="relative z-10">
						<div className="flex items-center gap-3">
							<motion.div
								whileHover={{ rotate: [0, 15, -15, 15, 0], scale: 1.2 }}
								transition={{ duration: 0.6, ease: "easeInOut" }}
								className="relative"
							>
								<Ship 
									className="w-5 h-5 text-cyan-400 transition-all duration-300 group-hover:text-cyan-300" 
									style={{
										filter: 'drop-shadow(0 0 5px rgba(0, 191, 255, 0.5))',
									}}
								/>
								<div className="absolute inset-0 bg-cyan-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
							</motion.div>
							<div className="text-sm">
								<p className="text-white font-semibold group-hover:text-cyan-100 transition-colors duration-300">Sea / Air Freight</p>
								<p className="text-white/70 text-xs group-hover:text-white/80 transition-colors duration-300">VIP handling</p>
							</div>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}





