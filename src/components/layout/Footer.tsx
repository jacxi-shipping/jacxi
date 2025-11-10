"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, MapPin, Phone, Mail, Globe2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
	const { t } = useTranslation();

	const quickLinks = [
		{ name: t('navigation.home'), href: '/' },
		{ name: t('navigation.services'), href: '/services' },
		{ name: t('navigation.process'), href: '/process' },
		{ name: t('navigation.tracking'), href: '/tracking' },
		{ name: t('navigation.about'), href: '/about' },
		{ name: t('navigation.contact'), href: '/contact' },
	];

	const services = [
		{ name: 'Door-to-Door Shipping', href: '/services#door-to-door' },
		{ name: 'Container Shipping', href: '/services#container' },
		{ name: 'Roll-on/Roll-off', href: '/services#roro' },
		{ name: 'Insurance Coverage', href: '/services#insurance' },
	];

	const socialLinks = [
		{ name: 'Facebook', href: '#', icon: Globe2 },
		{ name: 'Twitter', href: '#', icon: Globe2 },
		{ name: 'Instagram', href: '#', icon: Globe2 },
		{ name: 'LinkedIn', href: '#', icon: Globe2 },
	];

	return (
		<footer className="bg-[#020817] text-white border-t border-white/5">
			<div className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Company Info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6 }}
						className="space-y-4"
					>
						<Link href="/" className="flex items-center gap-2.5 group">
							<div className="relative">
								<Check className="w-5 h-5 sm:w-6 sm:h-6 text-white rotate-[-35deg] translate-x-[-2px]" strokeWidth={3} />
								<div className="absolute inset-0 bg-cyan-400/20 blur-sm" />
							</div>
							<span className="text-xl font-semibold text-white tracking-tight">Jacxi</span>
						</Link>
						<p className="text-sm text-white/70 leading-relaxed">
							{t('footer.description')}
						</p>
						<div className="flex space-x-4">
							{socialLinks.map((item) => {
								const Icon = item.icon;
								return (
									<a
										key={item.name}
										href={item.href}
										aria-label={item.name}
										className="text-white/70 hover:text-cyan-400 transition-colors duration-200"
									>
										<Icon className="h-5 w-5" />
									</a>
								);
							})}
						</div>
					</motion.div>

					{/* Quick Links */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.1 }}
						className="space-y-4"
					>
						<h3 className="text-sm font-semibold text-white mb-4">Quick Links</h3>
						<ul className="space-y-3">
							{quickLinks.map((item, index) => (
								<motion.li
									key={item.name}
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
								>
									<Link
										href={item.href}
										className="text-sm text-white/70 hover:text-cyan-400 transition-colors duration-200 inline-block"
									>
										{item.name}
									</Link>
								</motion.li>
							))}
						</ul>
					</motion.div>

					{/* Services */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.2 }}
						className="space-y-4"
					>
						<h3 className="text-sm font-semibold text-white mb-4">Services</h3>
						<ul className="space-y-3">
							{services.map((item, index) => (
								<motion.li
									key={item.name}
									initial={{ opacity: 0, x: -10 }}
									whileInView={{ opacity: 1, x: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
								>
									<Link
										href={item.href}
										className="text-sm text-white/70 hover:text-cyan-400 transition-colors duration-200 inline-block"
									>
										{item.name}
									</Link>
								</motion.li>
							))}
						</ul>
					</motion.div>

					{/* Contact Info */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="space-y-4"
					>
						<h3 className="text-sm font-semibold text-white mb-4">Contact</h3>
						<div className="space-y-4">
							<div className="flex items-start space-x-3">
								<MapPin className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
								<div className="text-sm text-white/70 leading-relaxed">
									<p>1234 Shipping Street</p>
									<p>New York, NY 10001</p>
									<p>United States</p>
								</div>
							</div>
							<div className="flex items-center space-x-3">
								<Phone className="h-5 w-5 text-cyan-400 flex-shrink-0" />
								<a
									href="tel:+1234567890"
									className="text-sm text-white/70 hover:text-cyan-400 transition-colors duration-200"
								>
									+1 (234) 567-890
								</a>
							</div>
							<div className="flex items-center space-x-3">
								<Mail className="h-5 w-5 text-cyan-400 flex-shrink-0" />
								<a
									href="mailto:info@jacxi.com"
									className="text-sm text-white/70 hover:text-cyan-400 transition-colors duration-200"
								>
									info@jacxi.com
								</a>
							</div>
						</div>
					</motion.div>
				</div>

				{/* Bottom Bar */}
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-12 pt-8 border-t border-white/10"
				>
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-sm text-white/70">
							© 2024 JACXI Shipping. All rights reserved.
						</p>
						<div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-end">
							<Link
								href="/privacy"
								className="text-sm text-white/70 hover:text-cyan-400 transition-colors duration-200"
							>
								Privacy Policy
							</Link>
							<Link
								href="/terms"
								className="text-sm text-white/70 hover:text-cyan-400 transition-colors duration-200"
							>
								Terms of Service
							</Link>
							<Link
								href="/cookies"
								className="text-sm text-white/70 hover:text-cyan-400 transition-colors duration-200"
							>
								Cookie Policy
							</Link>
						</div>
					</div>
				</motion.div>
			</div>
		</footer>
	);
}