"use client";

import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Truck, ShieldCheck, Package, Ship, FileText, DollarSign, MapPin, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export default function ServicesPage() {
	const { t } = useTranslation();

	const services = [
		{
			icon: Truck,
			title: t('services.doorToDoor.title'),
			description: t('services.doorToDoor.description'),
			features: [
				'Complete pickup and delivery',
				'Professional handling',
				'Real-time tracking',
				'Insurance coverage included'
			],
			price: 'From $1,200',
		},
		{
			icon: Package,
			title: t('services.container.title'),
			description: t('services.container.description'),
			features: [
				'Secure container transport',
				'Weather protection',
				'24/7 monitoring',
				'Full insurance coverage'
			],
			price: 'From $1,500',
		},
		{
			icon: Ship,
			title: t('services.rollOnRollOff.title'),
			description: t('services.rollOnRollOff.description'),
			features: [
				'Direct vehicle loading',
				'Faster transit times',
				'Cost-effective option',
				'Standard insurance included'
			],
			price: 'From $800',
		},
		{
			icon: ShieldCheck,
			title: t('services.insurance.title'),
			description: t('services.insurance.description'),
			features: [
				'Comprehensive coverage',
				'Damage protection',
				'Theft coverage',
				'Full value protection'
			],
			price: 'From $200',
		}
	];

	const processSteps = [
		{
			icon: DollarSign,
			label: t('process.step1.title'),
			description: t('process.step1.description'),
		},
		{
			icon: FileText,
			label: t('process.step2.title'),
			description: t('process.step2.description'),
		},
		{
			icon: Truck,
			label: t('process.step3.title'),
			description: t('process.step3.description'),
		},
		{
			icon: Ship,
			label: t('process.step4.title'),
			description: t('process.step4.description'),
		},
		{
			icon: MapPin,
			label: t('process.step5.title'),
			description: t('process.step5.description'),
		}
	];

	return (
		<div className="min-h-screen bg-[#020817]">
			{/* Hero Section */}
			<section className="relative min-h-[60vh] overflow-hidden bg-[#020817] text-white">
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

				{/* Main content */}
				<div className="relative z-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto space-y-6"
					>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white">
							{t('services.title')}
						</h1>
						<p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
							{t('services.subtitle')}
						</p>
					</motion.div>
				</div>
			</section>

			{/* Services Grid */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					{services.map((service, index) => (
						<motion.div
							key={service.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
						>
							<ServiceCard
								icon={service.icon}
								title={service.title}
								description={service.description}
								features={service.features}
								price={service.price}
							/>
						</motion.div>
					))}
				</div>
			</Section>

			{/* Process Section */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				{/* Section Title */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12 sm:mb-16"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
						{t('process.title')}
					</h2>
					<p className="text-lg sm:text-xl text-white/80">
						{t('process.subtitle')}
					</p>
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
					<div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 md:gap-4 lg:gap-8 items-start">
						{processSteps.map((step, index) => (
							<motion.div
								key={step.label}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true, margin: "-50px" }}
								transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
								className="relative"
							>
								{/* Connector line for mobile/tablet */}
								{index < processSteps.length - 1 && (
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
								<ProcessStepCard
									icon={step.icon}
									label={step.label}
									description={step.description}
									index={index}
								/>
							</motion.div>
						))}
					</div>
				</div>
			</Section>

			{/* CTA Section */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="relative"
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
								initial={{ opacity: 0, x: -20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="flex-1 space-y-4"
							>
								<h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
									Ready to Ship Your Cargo?
								</h3>
								<p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
									Get a free quote today and experience our professional, government-certified logistics services.
								</p>
							</motion.div>

							{/* CTA Button */}
							<motion.div
								initial={{ opacity: 0, x: 20 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6, delay: 0.4 }}
								className="flex-shrink-0 flex flex-col sm:flex-row gap-4"
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
									<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
								</Button>
								<Button
									variant="outline"
									size="lg"
									className={cn(
										'border-2 border-cyan-500/50 text-white hover:bg-cyan-500/10 hover:border-cyan-500',
										'px-8 py-6 text-base sm:text-lg font-semibold',
										'transition-all duration-300'
									)}
								>
									Track Shipment
								</Button>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</Section>
		</div>
	);
}

// Service Card Component
type ServiceCardProps = {
	icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	title: string;
	description: string;
	features: string[];
	price: string;
};

function ServiceCard({ icon: Icon, title, description, features, price }: ServiceCardProps) {
	return (
		<motion.div
			whileHover={{ y: -4 }}
			transition={{ duration: 0.3 }}
			className={cn(
				'group relative h-full rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8',
				'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
				'transition-all duration-300'
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
				<p className="text-sm sm:text-base text-white/80 mb-6 leading-relaxed">
					{description}
				</p>

				{/* Features List */}
				<ul className="space-y-3 mb-6">
					{features.map((feature, idx) => (
						<li key={idx} className="flex items-start text-sm text-white/70">
							<CheckCircle2 className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
							<span>{feature}</span>
						</li>
					))}
				</ul>

				{/* Price */}
				<div className="pt-4 border-t border-cyan-500/20">
					<div className="text-2xl font-bold text-cyan-400 mb-4">
						{price}
					</div>
					<Button
						className={cn(
							'w-full bg-[#00bfff]/10 hover:bg-[#00bfff]/20 text-cyan-400 border border-cyan-500/30 hover:border-cyan-500/50',
							'transition-all duration-300'
						)}
					>
						Get Quote
					</Button>
				</div>
			</div>
		</motion.div>
	);
}

// Process Step Card Component
type ProcessStepCardProps = {
	icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	label: string;
	description: string;
	index?: number;
};

function ProcessStepCard({ icon: Icon, label, description, index = 0 }: ProcessStepCardProps) {
	return (
		<div className="flex flex-col items-center text-center relative z-10">
			{/* Icon Circle */}
			<motion.div
				whileHover={{ scale: 1.05 }}
				initial={{ scale: 0 }}
				whileInView={{ scale: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay: index * 0.15, type: "spring", stiffness: 200 }}
				className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center bg-[#020817] border-2 border-cyan-500/60 group hover:border-cyan-400 transition-all duration-300"
			>
				{/* Glow effect */}
				<div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
				<Icon className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
			</motion.div>

			{/* Label */}
			<motion.div
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true }}
				transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
				className="mt-4 sm:mt-6"
			>
				<span className="text-sm sm:text-base md:text-lg font-medium text-white/90 leading-tight block mb-2">
					{label}
				</span>
				<p className="text-xs sm:text-sm text-white/60">
					{description}
				</p>
			</motion.div>
		</div>
	);
}
