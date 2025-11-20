'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Add, ChevronLeft, ChevronRight, Inventory2 } from '@mui/icons-material';
import { Button, Box, CircularProgress, Typography } from '@mui/material';
import ShipmentRow from '@/components/dashboard/ShipmentRow';
import Section from '@/components/layout/Section';
import SmartSearch, { SearchFilters } from '@/components/dashboard/SmartSearch';
import PageHeader from '@/components/dashboard/PageHeader';

interface Shipment {
	id: string;
	trackingNumber: string;
	vehicleType: string;
	vehicleMake: string | null;
	vehicleModel: string | null;
	origin: string;
	destination: string;
	status: string;
	progress: number;
	estimatedDelivery: string | null;
	createdAt: string;
	paymentStatus?: string;
	user: {
		name: string | null;
		email: string;
	};
}

export default function ShipmentsListPage() {
	const { data: session } = useSession();
	const [shipments, setShipments] = useState<Shipment[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchFilters, setSearchFilters] = useState<SearchFilters>({
		query: '',
		type: 'shipments',
	});
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchShipments = useCallback(async () => {
		try {
			setLoading(true);
			
			// Build query params from search filters
			const params = new URLSearchParams();
			params.append('page', currentPage.toString());
			params.append('limit', '10');
			
			if (searchFilters.query) params.append('query', searchFilters.query);
			if (searchFilters.status) params.append('status', searchFilters.status);
			if (searchFilters.dateFrom) params.append('dateFrom', searchFilters.dateFrom);
			if (searchFilters.dateTo) params.append('dateTo', searchFilters.dateTo);
			if (searchFilters.minPrice) params.append('minPrice', searchFilters.minPrice);
			if (searchFilters.maxPrice) params.append('maxPrice', searchFilters.maxPrice);

			const response = await fetch(`/api/search?${params.toString()}&type=shipments&sortBy=createdAt&sortOrder=desc`);
			const data = await response.json();
			
			setShipments(data.shipments ?? []);
			setTotalPages(Math.ceil((data.totalShipments ?? 0) / 10) || 1);
		} catch (error) {
			console.error('Error fetching shipments:', error);
			setShipments([]);
		} finally {
			setLoading(false);
		}
	}, [searchFilters, currentPage]);

	useEffect(() => {
		fetchShipments();
	}, [fetchShipments]);

	const handleSearch = (filters: SearchFilters) => {
		setSearchFilters(filters);
		setCurrentPage(1); // Reset to first page on new search
	};

	const isAdmin = session?.user?.role === 'admin';

	const summarized = useMemo(() => {
		const active = shipments.filter((shipment) => shipment.status !== 'DELIVERED').length;
		const delivered = shipments.filter((shipment) => shipment.status === 'DELIVERED').length;
		return { active, delivered, total: shipments.length };
	}, [shipments]);

	return (
		<Section>
			<div className="flex min-h-0 flex-col gap-4">
				<PageHeader
					title="Shipments"
					description="Search, filter, and action every container and vehicle movement without leaving this screen."
					actions={
						<Link href="/dashboard/shipments/new" style={{ textDecoration: 'none' }}>
							<Button variant="contained" startIcon={<Add />} sx={{ borderRadius: 999 }}>
								New shipment
							</Button>
						</Link>
					}
					meta={[
						{ label: 'Visible', value: summarized.total, hint: 'Current page', tone: 'neutral' },
						{ label: 'Active', value: summarized.active, hint: 'Not delivered', tone: 'cyan' },
						{ label: 'Delivered', value: summarized.delivered, hint: 'Closed jobs', tone: 'emerald' },
						{ label: 'Page', value: `${currentPage}/${totalPages}`, hint: 'Pagination', tone: 'amber' },
					]}
				/>

				<Box className="dashboard-panel flex min-h-0 flex-col gap-3">
					<SmartSearch
						onSearch={handleSearch}
						placeholder="Search shipments by tracking number, VIN, origin, destination..."
						showTypeFilter={false}
						showStatusFilter
						showDateFilter
						showPriceFilter
						showUserFilter={isAdmin}
						defaultType="shipments"
					/>

					{loading ? (
						<Box sx={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
							<CircularProgress size={48} sx={{ color: 'rgb(34,211,238)' }} />
						</Box>
					) : shipments.length === 0 ? (
						<Box sx={{ textAlign: 'center', py: 6 }}>
							<Inventory2 sx={{ fontSize: 56, color: 'rgba(255,255,255,0.25)', mb: 1.5 }} />
							<Typography sx={{ color: 'rgba(255,255,255,0.7)', mb: 2 }}>No shipments found</Typography>
							<Link href="/dashboard/shipments/new" style={{ textDecoration: 'none' }}>
								<Button variant="contained" startIcon={<Add />}>
									Create shipment
								</Button>
							</Link>
						</Box>
					) : (
						<>
							<Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
								Showing {shipments.length} shipment{shipments.length === 1 ? '' : 's'}
							</Typography>
							<Box className="dashboard-scroll flex-1 min-h-0 space-y-2" sx={{ maxHeight: 'calc(100vh - 420px)' }}>
								{shipments.map((shipment, index) => (
									<ShipmentRow
										key={shipment.id}
										{...shipment}
										showCustomer={isAdmin}
										isAdmin={isAdmin}
										onStatusUpdated={fetchShipments}
										delay={index * 0.05}
									/>
								))}
							</Box>

							{totalPages > 1 && (
								<Box
									sx={{
										pt: 2,
										display: 'flex',
										flexDirection: { xs: 'column', sm: 'row' },
										justifyContent: 'center',
										alignItems: 'center',
										gap: 1,
									}}
								>
									<Button
										variant="outlined"
										size="small"
										startIcon={<ChevronLeft sx={{ fontSize: 16 }} />}
										onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
										disabled={currentPage === 1}
										sx={{ borderRadius: 999 }}
									>
										Previous
									</Button>
									<Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>
										Page {currentPage} of {totalPages}
									</Typography>
									<Button
										variant="outlined"
										size="small"
										endIcon={<ChevronRight sx={{ fontSize: 16 }} />}
										onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
										disabled={currentPage === totalPages}
										sx={{ borderRadius: 999 }}
									>
										Next
									</Button>
								</Box>
							)}
						</>
					)}
				</Box>
			</div>
		</Section>
	);
}
