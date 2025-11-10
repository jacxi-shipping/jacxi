"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type ShipmentCardProps = {
	id: string;
	trackingNumber: string;
	status: string;
	origin: string;
	destination: string;
	progress: number;
	estimatedDelivery: string | null;
	delay?: number;
};

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
	'IN_TRANSIT': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
	'IN_TRANSIT_OCEAN': { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/30' },
	'AT_PORT': { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/30' },
	'DELIVERED': { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30' },
	'PICKUP_SCHEDULED': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
	'PICKUP_COMPLETED': { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30' },
	'PENDING': { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30' },
};

export default function ShipmentCard({
	id,
	trackingNumber,
	status,
	origin,
	destination,
	progress,
	estimatedDelivery,
	delay = 0,
}: ShipmentCardProps) {
	const statusConfig = statusColors[status] || statusColors['PENDING'];

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay }}
			whileHover={{ y: -2 }}
			className={cn(
				'group relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8',
				'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
				'transition-all duration-300'
			)}
		>
			{/* Glowing border effect on hover */}
			<div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<div className="relative z-10 space-y-4">
				{/* Header */}
				<div className="flex items-start justify-between">
					<div className="flex-1">
						<h3 className="text-lg sm:text-xl font-bold text-white mb-1">
							{trackingNumber}
						</h3>
						<p className="text-sm sm:text-base text-white/70">
							{origin} → {destination}
						</p>
					</div>
					<span className={cn(
						'px-3 py-1 text-xs font-medium rounded-full border',
						statusConfig.bg,
						statusConfig.text,
						statusConfig.border
					)}>
						{status.replace(/_/g, ' ')}
					</span>
				</div>

				{/* Progress */}
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-white/80">Progress</span>
						<span className="text-cyan-400 font-semibold">{progress}%</span>
					</div>
					<div className="relative w-full h-2 bg-[#020817] rounded-full overflow-hidden">
						<motion.div
							initial={{ width: 0 }}
							whileInView={{ width: `${progress}%` }}
							viewport={{ once: true }}
							transition={{ duration: 1, delay: delay + 0.2 }}
							className="absolute left-0 top-0 h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
						/>
						{/* Glow effect */}
						<div className="absolute left-0 top-0 h-full w-full bg-cyan-500/20 blur-sm" />
					</div>
				</div>

				{/* Footer */}
				<div className="flex items-center justify-between pt-4 border-t border-white/10">
					<div className="text-xs sm:text-sm text-white/60">
						{estimatedDelivery ? (
							<span>ETA: {new Date(estimatedDelivery).toLocaleDateString()}</span>
						) : (
							<span>ETA: TBD</span>
						)}
					</div>
					<Link href={`/dashboard/shipments/${id}`}>
						<Button
							variant="outline"
							size="sm"
							className="group/btn border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50"
						>
							<Eye className="w-4 h-4 mr-2" />
							View Details
							<ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
						</Button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}

