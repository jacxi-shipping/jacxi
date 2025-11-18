"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Package, FileText, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
	{
		icon: Plus,
		title: 'New Shipment',
		description: 'Create a new shipping request',
		href: '/dashboard/shipments/new',
		color: 'cyan',
	},
	{
		icon: Search,
		title: 'Track Shipment',
		description: 'Track an existing shipment',
		href: '/dashboard/tracking',
		color: 'blue',
	},
	{
		icon: Package,
		title: 'All Shipments',
		description: 'View all your shipments',
		href: '/dashboard/shipments',
		color: 'purple',
	},
	{
		icon: FileText,
		title: 'Documents',
		description: 'Manage shipping documents',
		href: '/dashboard/documents',
		color: 'green',
	},
];

export default function QuickActions() {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className="space-y-3 sm:space-y-4 md:space-y-5"
		>
			<div>
				<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">
					Quick Actions
				</h2>
				<p className="text-xs sm:text-sm md:text-base text-white/70">
					Common tasks
				</p>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-1 gap-2 sm:gap-3 md:gap-4">
				{actions.map((action, index) => {
					const Icon = action.icon;
					const colorClasses = {
						cyan: 'border-cyan-500/30 hover:border-cyan-500/60 text-cyan-400 hover:bg-cyan-500/10',
						blue: 'border-blue-500/30 hover:border-blue-500/60 text-blue-400 hover:bg-blue-500/10',
						purple: 'border-purple-500/30 hover:border-purple-500/60 text-purple-400 hover:bg-purple-500/10',
						green: 'border-green-500/30 hover:border-green-500/60 text-green-400 hover:bg-green-500/10',
					};

					return (
						<Link key={action.title} href={action.href} className="block">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								whileHover={{ y: -4, scale: 1.02 }}
								className={cn(
									'group relative rounded-lg bg-[#0a1628]/60 backdrop-blur-sm border p-3 sm:p-4 md:p-5',
									'hover:shadow-lg transition-all duration-300 cursor-pointer',
									'h-[100px] sm:h-[120px] lg:h-auto lg:min-h-[140px]',
									'w-full flex flex-col',
									colorClasses[action.color as keyof typeof colorClasses]
								)}
							>
								{/* Glowing border effect on hover */}
								<div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

								<div className="relative z-10 flex flex-col h-full">
									<div className="mb-2 sm:mb-3">
										<div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg bg-[#020817] border border-current/40 flex items-center justify-center group-hover:border-current/80 transition-colors duration-300">
											<div className="absolute inset-0 rounded-lg bg-current/10 blur-md group-hover:bg-current/20 transition-all duration-300" />
											<Icon className="relative w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-current group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
										</div>
									</div>
									<div className="flex-1">
										<h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-0.5 sm:mb-1 line-clamp-1">
											{action.title}
										</h3>
										<p className="text-[10px] sm:text-xs md:text-sm text-white/70 line-clamp-2">
											{action.description}
										</p>
									</div>
								</div>
							</motion.div>
						</Link>
					);
				})}
			</div>
		</motion.div>
	);
}

