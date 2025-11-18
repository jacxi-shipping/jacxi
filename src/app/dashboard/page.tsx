'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Package, TrendingUp, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import StatsCard from '@/components/dashboard/StatsCard';
import ShipmentCard from '@/components/dashboard/ShipmentCard';
import QuickActions from '@/components/dashboard/QuickActions';
import Section from '@/components/layout/Section';

interface Shipment {
	id: string;
	trackingNumber: string;
	status: string;
	origin: string;
	destination: string;
	progress: number;
	estimatedDelivery: string | null;
}

export default function DashboardPage() {
	const { data: session } = useSession();
	const [loading, setLoading] = useState(true);
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [stats, setStats] = useState({
		active: 0,
		total: 0,
		inTransit: 0,
		delivered: 0,
	});

	const fetchDashboardData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/shipments?limit=100');
			if (!response.ok) {
				setShipments([]);
				setStats({
					active: 0,
					total: 0,
					inTransit: 0,
					delivered: 0,
				});
				return;
			}

			const data = (await response.json()) as { shipments?: Shipment[] };
			const shipmentsList = data.shipments ?? [];
			setShipments(shipmentsList);

			const activeStatuses = new Set([
				'PENDING',
				'QUOTE_REQUESTED',
				'QUOTE_APPROVED',
				'PICKUP_SCHEDULED',
				'PICKUP_COMPLETED',
				'IN_TRANSIT',
				'AT_PORT',
				'LOADED_ON_VESSEL',
				'IN_TRANSIT_OCEAN',
				'ARRIVED_AT_DESTINATION',
				'CUSTOMS_CLEARANCE',
				'OUT_FOR_DELIVERY',
			]);

			const active = shipmentsList.filter((shipment) => activeStatuses.has(shipment.status)).length;
			const inTransit = shipmentsList.filter((shipment) =>
				['IN_TRANSIT', 'AT_PORT', 'LOADED_ON_VESSEL', 'IN_TRANSIT_OCEAN'].includes(shipment.status)
			).length;
			const delivered = shipmentsList.filter((shipment) => shipment.status === 'DELIVERED').length;

			setStats({
				active,
				total: shipmentsList.length,
				inTransit,
				delivered,
			});
		} catch (error) {
			console.error('Error fetching dashboard data:', error);
			setShipments([]);
			setStats({
				active: 0,
				total: 0,
				inTransit: 0,
				delivered: 0,
			});
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		void fetchDashboardData();
	}, [fetchDashboardData]);

	const recentShipments = useMemo(() => shipments.slice(0, 3), [shipments]);

	return (
		<>
			{/* Hero Header */}
			<Section className="relative bg-[#020817] py-6 sm:py-12 lg:py-16 overflow-hidden">
					{/* Background gradient */}
					<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />

					{/* Subtle geometric grid pattern */}
					<div className="absolute inset-0 opacity-[0.03]">
						<svg className="w-full h-full" preserveAspectRatio="none">
							<defs>
								<pattern id="grid-dashboard" width="40" height="40" patternUnits="userSpaceOnUse">
									<path
										d="M 40 0 L 0 0 0 40"
										fill="none"
										stroke="currentColor"
										strokeWidth="1"
									/>
								</pattern>
							</defs>
							<rect width="100%" height="100%" fill="url(#grid-dashboard)" className="text-cyan-400" />
						</svg>
					</div>

					<div className="relative z-10">
						<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
								className="space-y-1 sm:space-y-2 max-w-full"
							>
								<h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight break-words">
									Welcome back{session?.user?.name && `, ${session.user.name}`}!
								</h1>
								<p className="text-sm sm:text-lg md:text-xl text-white/70">
									Here&apos;s your shipment overview
								</p>
							</motion.div>
						{session?.user?.role === 'admin' && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
								className="w-full sm:w-auto"
							>
								<Link href="/dashboard/shipments/new" className="block">
									<Button
										size="lg"
										className="group relative overflow-hidden bg-[#00bfff] text-white hover:bg-[#00a8e6] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto"
									>
										<Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
										New Shipment
									</Button>
								</Link>
							</motion.div>
						)}
						</div>
					</div>
				</Section>

				{/* Main Content */}
				<Section className="bg-[#020817] py-6 sm:py-12 lg:py-16">
					{/* Stats Grid */}
					<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
						<StatsCard
							icon={Truck}
							title="Active Shipments"
							value={stats.active}
							subtitle="Currently in progress"
							delay={0}
						/>
						<StatsCard
							icon={Package}
							title="In Transit"
							value={stats.inTransit}
							subtitle="On the way"
							delay={0.1}
						/>
						<StatsCard
							icon={MapPin}
							title="Total Shipments"
							value={stats.total}
							subtitle="All time"
							delay={0.2}
						/>
						<StatsCard
							icon={TrendingUp}
							title="Delivered"
							value={stats.delivered}
							subtitle="Successfully completed"
							delay={0.3}
						/>
					</div>

					{/* Content Grid */}
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
						{/* Recent Shipments - Takes 2 columns */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="lg:col-span-2 space-y-4 sm:space-y-6"
						>
							<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
								<div className="flex-1 min-w-0">
									<h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2 truncate">
										Recent Shipments
									</h2>
									<p className="text-xs sm:text-sm md:text-base text-white/70">
										Your latest activity
									</p>
								</div>
								{shipments.length > 0 && (
									<Link href="/dashboard/shipments" className="w-full sm:w-auto">
										<Button
											variant="outline"
											size="sm"
											className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 w-full sm:w-auto text-xs sm:text-sm"
										>
											View All
										</Button>
									</Link>
								)}
							</div>

							{loading ? (
								<div className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-12 text-center">
									<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-400"></div>
									<p className="mt-4 text-white/70">Loading shipments...</p>
								</div>
							) : recentShipments.length === 0 ? (
								<div className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-12 text-center">
									<Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
									<p className="text-white/70 mb-6">No shipments yet</p>
									<Link href="/dashboard/shipments/new">
										<Button className="bg-[#00bfff] text-white hover:bg-[#00a8e6]">
											<Plus className="w-5 h-5 mr-2" />
											Create Your First Shipment
										</Button>
									</Link>
								</div>
							) : (
								<div className="space-y-4 sm:space-y-6">
									{recentShipments.map((shipment, index) => (
										<ShipmentCard
											key={shipment.id}
											{...shipment}
											delay={0.5 + index * 0.1}
										/>
									))}
								</div>
							)}
						</motion.div>

						{/* Quick Actions - Takes 1 column */}
						<div className="lg:col-span-1">
							<QuickActions />
						</div>
					</div>
				</Section>
		</>
	);
}
