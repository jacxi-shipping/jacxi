"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Progress } from '@/components/ui/Progress';
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

type BadgeVariant =
	| 'status-pickup-scheduled'
	| 'status-picked-up'
	| 'status-in-transit'
	| 'status-at-port'
	| 'status-customs-clearance'
	| 'status-out-for-delivery'
	| 'status-delivered'
	| 'status-delayed'
	| 'status-cancelled';

const statusBadgeVariants: Record<string, BadgeVariant> = {
	'IN_TRANSIT': 'status-in-transit',
	'IN_TRANSIT_OCEAN': 'status-in-transit',
	'AT_PORT': 'status-at-port',
	'DELIVERED': 'status-delivered',
	'PICKUP_SCHEDULED': 'status-pickup-scheduled',
	'PICKUP_COMPLETED': 'status-pickup-scheduled',
	'PENDING': 'status-pickup-scheduled',
	'QUOTE_REQUESTED': 'status-pickup-scheduled',
	'QUOTE_APPROVED': 'status-pickup-scheduled',
	'LOADED_ON_VESSEL': 'status-in-transit',
	'ARRIVED_AT_DESTINATION': 'status-at-port',
	'CUSTOMS_CLEARANCE': 'status-at-port',
	'OUT_FOR_DELIVERY': 'status-out-for-delivery',
	'DELAYED': 'status-delayed',
	'CANCELLED': 'status-delayed',
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
	const badgeVariant = statusBadgeVariants[status] || 'status-pickup-scheduled';

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			whileInView={{ opacity: 1, x: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5, delay }}
			whileHover={{ y: -2 }}
			className={cn(
				'group relative rounded-lg sm:rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-4 sm:p-6 md:p-8',
				'hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20',
				'transition-all duration-300'
			)}
		>
			{/* Glowing border effect on hover */}
			<div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			<div className="relative z-10 space-y-3 sm:space-y-4">
				{/* Header */}
				<div className="flex items-start justify-between gap-2 sm:gap-3">
					<div className="flex-1 min-w-0">
						<h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-0.5 sm:mb-1 truncate">
							{trackingNumber}
						</h3>
						<p className="text-xs sm:text-sm md:text-base text-white/70 truncate">
							{origin} → {destination}
						</p>
					</div>
					<Badge variant={badgeVariant} size="sm" className="flex-shrink-0 text-xs">
						{status.replace(/_/g, ' ')}
					</Badge>
				</div>

				{/* Progress */}
				<div className="space-y-2 sm:space-y-3">
					<Progress
						value={progress}
						max={100}
						showValue={true}
						variant="brand"
						size="sm"
					/>
				</div>

				{/* Footer */}
				<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-white/10">
					<div className="text-[10px] sm:text-xs md:text-sm text-white/60">
						{estimatedDelivery ? (
							<span>ETA: {new Date(estimatedDelivery).toLocaleDateString()}</span>
						) : (
							<span>ETA: TBD</span>
						)}
					</div>
					<Link href={`/dashboard/shipments/${id}`} className="w-full sm:w-auto">
						<Button
							variant="outline"
							size="sm"
							className="group/btn border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 w-full sm:w-auto text-xs sm:text-sm"
						>
							<Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
							<span className="hidden sm:inline">View Details</span>
							<span className="sm:hidden">Details</span>
							<ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2 group-hover/btn:translate-x-1 transition-transform" />
						</Button>
					</Link>
				</div>
			</div>
		</motion.div>
	);
}

