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

const statusBadgeVariants: Record<string, string> = {
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
					<Badge variant={badgeVariant as keyof typeof badgeVariants} size="sm">
						{status.replace(/_/g, ' ')}
					</Badge>
				</div>

				{/* Progress */}
				<div className="space-y-3">
					<Progress
						value={progress}
						max={100}
						showValue={true}
						variant="brand"
						size="sm"
					/>
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

