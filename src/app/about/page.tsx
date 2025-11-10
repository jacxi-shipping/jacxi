"use client";

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Truck, ShieldCheck, Globe, Users, Star, Award, Target, Eye, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
	const { t } = useTranslation();

	const stats = [
		{
			icon: Truck,
			value: '10,000+',
			label: 'Vehicles Shipped',
		},
		{
			icon: Globe,
			value: '50+',
			label: 'Countries Served',
		},
		{
			icon: Users,
			value: '5,000+',
			label: 'Happy Customers',
		},
		{
			icon: Star,
			value: '4.9/5',
			label: 'Customer Rating',
		}
	];

	const values = [
		{
			icon: ShieldCheck,
			title: 'Reliability',
			description: 'We deliver on our promises with consistent, dependable service.',
		},
		{
			icon: ShieldCheck,
			title: 'Security',
			description: 'Your vehicle is protected with comprehensive insurance coverage.',
		},
		{
			icon: Eye,
			title: 'Transparency',
			description: 'Real-time tracking and clear communication throughout the process.',
		},
		{
			icon: Star,
			title: 'Excellence',
			description: 'Committed to providing the highest quality service standards.',
		}
	];

	const team = [
		{
			name: 'Ahmad Shah',
			position: 'CEO & Founder',
			description: '15+ years in international logistics and shipping industry.',
		},
		{
			name: 'Sarah Johnson',
			position: 'Operations Director',
			description: 'Expert in supply chain management and customer relations.',
		},
		{
			name: 'Mohammad Hassan',
			position: 'Regional Manager - Afghanistan',
			description: 'Local expertise in Afghanistan and Middle East markets.',
		},
		{
			name: 'David Chen',
			position: 'Technology Director',
			description: 'Leading our digital transformation and tracking systems.',
		}
	];

	const certifications = [
		{
			icon: Award,
			name: 'ISO 9001:2015',
			description: 'Quality Management System',
		},
		{
			icon: ShieldCheck,
			name: 'C-TPAT Certified',
			description: 'Customs-Trade Partnership Against Terrorism',
		},
		{
			icon: Globe,
			name: 'IATA Member',
			description: 'International Air Transport Association',
		},
		{
			icon: Star,
			name: 'FIDI Certified',
			description: 'Fédération Internationale des Déménageurs Internationaux',
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
							{t('about.title')}
						</h1>
						<p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
							{t('about.subtitle')}
						</p>
					</motion.div>
				</div>
			</section>

			{/* Stats Section */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
					{stats.map((stat, index) => (
						<motion.div
							key={stat.label}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
							className="text-center group"
						>
							<div className={cn(
								'relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8',
								'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
								'transition-all duration-300'
							)}>
								{/* Glowing border effect on hover */}
								<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								
								<div className="relative z-10">
									<div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#020817] border border-cyan-500/40 flex items-center justify-center mb-4 group-hover:border-cyan-500/80 transition-colors duration-300">
										<div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
										<stat.icon className="relative w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
									</div>
									<div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
										{stat.value}
									</div>
									<div className="text-sm sm:text-base text-white/70">
										{stat.label}
									</div>
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</Section>

			{/* Mission & Vision */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
					>
						<MissionVisionCard
							icon={Target}
							title={t('about.mission')}
							description="To provide reliable, secure, and affordable vehicle shipping services that connect people and businesses across continents. We are committed to making international vehicle transportation accessible, transparent, and stress-free for our customers."
						/>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<MissionVisionCard
							icon={Eye}
							title={t('about.vision')}
							description="To become the leading global vehicle shipping company, recognized for our innovation, customer service excellence, and commitment to sustainable transportation solutions. We envision a world where distance is no barrier to vehicle ownership and mobility."
						/>
					</motion.div>
				</div>
			</Section>

			{/* Values Section */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12 sm:mb-16"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
						{t('about.values')}
					</h2>
					<p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
						Our core values guide everything we do and shape our commitment to excellence.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					{values.map((value, index) => (
						<motion.div
							key={value.title}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
						>
							<ValueCard
								icon={value.icon}
								title={value.title}
								description={value.description}
							/>
						</motion.div>
					))}
				</div>
			</Section>

			{/* Team Section */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12 sm:mb-16"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
						Meet Our Team
					</h2>
					<p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
						Experienced professionals dedicated to providing exceptional service.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					{team.map((member, index) => (
						<motion.div
							key={member.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
						>
							<TeamCard
								name={member.name}
								position={member.position}
								description={member.description}
							/>
						</motion.div>
					))}
				</div>
			</Section>

			{/* Certifications Section */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="text-center mb-12 sm:mb-16"
				>
					<h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
						Certifications & Compliance
					</h2>
					<p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
						We maintain the highest standards of quality, security, and compliance.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					{certifications.map((cert, index) => (
						<motion.div
							key={cert.name}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
						>
							<CertificationCard
								icon={cert.icon}
								name={cert.name}
								description={cert.description}
							/>
						</motion.div>
					))}
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
									Ready to Experience Our Service?
								</h3>
								<p className="text-lg sm:text-xl md:text-2xl text-white/80 leading-relaxed max-w-2xl">
									Join thousands of satisfied customers who trust JACXI for their vehicle shipping needs.
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
									<span>Get Free Quote</span>
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
									Contact Us
								</Button>
							</motion.div>
						</div>
					</div>
				</motion.div>
			</Section>
		</div>
	);
}

// Mission/Vision Card Component
type MissionVisionCardProps = {
	icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	title: string;
	description: string;
};

function MissionVisionCard({ icon: Icon, title, description }: MissionVisionCardProps) {
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
			<div className="mb-6">
				<div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#020817] border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-500/80 transition-colors duration-300">
					<div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
					<Icon className="relative w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10">
				<h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
					{title}
				</h3>
				<p className="text-sm sm:text-base text-white/80 leading-relaxed">
					{description}
				</p>
			</div>
		</motion.div>
	);
}

// Value Card Component
type ValueCardProps = {
	icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	title: string;
	description: string;
};

function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
	return (
		<motion.div
			whileHover={{ y: -4 }}
			transition={{ duration: 0.3 }}
			className={cn(
				'group relative h-full rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8 text-center',
				'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
				'transition-all duration-300'
			)}
		>
			{/* Glowing border effect on hover */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Icon Container */}
			<div className="mb-6 flex justify-center">
				<div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#020817] border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-500/80 transition-colors duration-300">
					<div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
					<Icon className="relative w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10">
				<h3 className="text-xl font-semibold text-white mb-3">
					{title}
				</h3>
				<p className="text-sm sm:text-base text-white/70">
					{description}
				</p>
			</div>
		</motion.div>
	);
}

// Team Card Component
type TeamCardProps = {
	name: string;
	position: string;
	description: string;
};

function TeamCard({ name, position, description }: TeamCardProps) {
	return (
		<motion.div
			whileHover={{ y: -4 }}
			transition={{ duration: 0.3 }}
			className={cn(
				'group relative h-full rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8 text-center',
				'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
				'transition-all duration-300'
			)}
		>
			{/* Glowing border effect on hover */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Avatar Placeholder */}
			<div className="mb-6 flex justify-center">
				<div className="relative w-24 h-24 rounded-full bg-[#020817] border-2 border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-500/80 transition-colors duration-300">
					<div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
					<User className="relative w-12 h-12 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10">
				<h3 className="text-lg sm:text-xl font-semibold text-white mb-1">
					{name}
				</h3>
				<p className="text-cyan-400 font-medium mb-3 text-sm sm:text-base">
					{position}
				</p>
				<p className="text-sm text-white/70">
					{description}
				</p>
			</div>
		</motion.div>
	);
}

// Certification Card Component
type CertificationCardProps = {
	icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
	name: string;
	description: string;
};

function CertificationCard({ icon: Icon, name, description }: CertificationCardProps) {
	return (
		<motion.div
			whileHover={{ y: -4 }}
			transition={{ duration: 0.3 }}
			className={cn(
				'group relative h-full rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8 text-center',
				'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
				'transition-all duration-300'
			)}
		>
			{/* Glowing border effect on hover */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Icon Container */}
			<div className="mb-6 flex justify-center">
				<div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#020817] border border-cyan-500/40 flex items-center justify-center group-hover:border-cyan-500/80 transition-colors duration-300">
					<div className="absolute inset-0 rounded-xl bg-cyan-500/10 blur-md group-hover:bg-cyan-500/20 transition-all duration-300" />
					<Icon className="relative w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={1.5} />
				</div>
			</div>

			{/* Content */}
			<div className="relative z-10">
				<h3 className="text-lg font-semibold text-white mb-2">
					{name}
				</h3>
				<p className="text-sm text-white/70">
					{description}
				</p>
			</div>
		</motion.div>
	);
}
