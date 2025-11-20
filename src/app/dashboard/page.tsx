'use client';

import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Add, Inventory2, TrendingUp, LocalShipping, LocationOn } from '@mui/icons-material';
import { Button, Box, CircularProgress, Typography, Fade } from '@mui/material';
import StatsCard from '@/components/dashboard/StatsCard';
import ShipmentCard from '@/components/dashboard/ShipmentCard';
import QuickActions from '@/components/dashboard/QuickActions';
import Section from '@/components/layout/Section';
import PageHeader from '@/components/dashboard/PageHeader';

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
	const [showContent, setShowContent] = useState(false);

	useEffect(() => {
		setShowContent(true);
	}, []);

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
		<Section>
			<div className="flex min-h-0 flex-col gap-4">
				<PageHeader
					title="Command Center"
					description="Track the health of every shipment and jump into critical workflows instantly."
					actions={
						<Link href="/dashboard/shipments/new" style={{ textDecoration: 'none' }}>
							<Button
								variant="contained"
								startIcon={<Add />}
								sx={{
									background: 'linear-gradient(135deg, #00bfff 0%, #0099cc 100%)',
									fontWeight: 600,
									borderRadius: 999,
								}}
							>
								New shipment
							</Button>
						</Link>
					}
					meta={[
						{ label: 'Active', value: stats.active, hint: 'Moving through the network', tone: 'cyan' },
						{ label: 'In transit', value: stats.inTransit, hint: 'Across all corridors', tone: 'violet' },
						{ label: 'Delivered', value: stats.delivered, hint: 'Completed this year', tone: 'emerald' },
						{ label: 'Total', value: stats.total, hint: 'All time', tone: 'neutral' },
					]}
				/>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(4, minmax(0, 1fr))' },
						gap: 1.5,
					}}
				>
					<StatsCard icon={LocalShipping} title="Active Shipments" value={stats.active} subtitle="Currently in motion" />
					<StatsCard icon={Inventory2} title="In Transit" value={stats.inTransit} subtitle="On ocean & land" />
					<StatsCard icon={LocationOn} title="Total Shipments" value={stats.total} subtitle="All time volume" />
					<StatsCard icon={TrendingUp} title="Delivered" value={stats.delivered} subtitle="Completed journeys" />
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 2fr) minmax(0, 1fr)' },
						gap: 2,
						minHeight: 0,
					}}
				>
					<Box className="dashboard-panel flex min-h-0 flex-col gap-3">
						<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
							<Box>
								<Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'white' }}>Recent shipments</Typography>
								<Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>Latest 3 updates from operations</Typography>
							</Box>
							{shipments.length > 0 && (
								<Link href="/dashboard/shipments" style={{ textDecoration: 'none' }}>
									<Button variant="outlined" size="small" sx={{ borderRadius: 999, color: 'rgb(34,211,238)', borderColor: 'rgba(34,211,238,0.4)' }}>
										View all
									</Button>
								</Link>
							)}
						</Box>

						{loading ? (
							<Box sx={{ minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
								<CircularProgress size={48} sx={{ color: 'rgb(34,211,238)' }} />
							</Box>
						) : recentShipments.length === 0 ? (
							<Box sx={{ textAlign: 'center', py: 6 }}>
								<Inventory2 sx={{ fontSize: 48, color: 'rgba(255,255,255,0.25)', mb: 1 }} />
								<Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>No shipments yet</Typography>
								<Link href="/dashboard/shipments/new" style={{ textDecoration: 'none' }}>
									<Button startIcon={<Add />} variant="contained">
										Create your first shipment
									</Button>
								</Link>
							</Box>
						) : (
							<Box className="dashboard-scroll flex-1 min-h-0 space-y-2" sx={{ maxHeight: { xs: 'unset', lg: 'calc(100vh - 420px)' } }}>
								{recentShipments.map((shipment, index) => (
									<ShipmentCard key={shipment.id} {...shipment} delay={0.5 + index * 0.1} />
								))}
							</Box>
						)}
					</Box>

					<Box className="min-h-0">
						<QuickActions />
					</Box>
				</Box>
			</div>
		</Section>
	);
}
