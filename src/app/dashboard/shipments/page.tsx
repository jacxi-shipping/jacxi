'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ShipmentRow from '@/components/dashboard/ShipmentRow';
import Section from '@/components/layout/Section';
import SmartSearch, { SearchFilters } from '@/components/dashboard/SmartSearch';

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

	return (
		<>
			{/* Header */}
			<Section className="relative bg-[#020817] py-6 sm:py-12 lg:py-16 overflow-hidden">
				{/* Background gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />

				{/* Subtle geometric grid pattern */}
				<div className="absolute inset-0 opacity-[0.03]">
					<svg className="w-full h-full" preserveAspectRatio="none">
						<defs>
							<pattern id="grid-shipments" width="40" height="40" patternUnits="userSpaceOnUse">
								<path
									d="M 40 0 L 0 0 0 40"
									fill="none"
									stroke="currentColor"
									strokeWidth="1"
								/>
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid-shipments)" className="text-cyan-400" />
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
								Shipments Management
							</h1>
							<p className="text-sm sm:text-lg md:text-xl text-white/70">
								Manage and track all shipments
							</p>
						</motion.div>
						{isAdmin && (
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
			<Section className="bg-[#020817] py-6 sm:py-12">
				{/* Smart Search & Filters */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="mb-6 sm:mb-8"
				>
					<SmartSearch
						onSearch={handleSearch}
						placeholder="Search shipments by tracking number, VIN, origin, destination..."
						showTypeFilter={false}
						showStatusFilter={true}
						showDateFilter={true}
						showPriceFilter={true}
						showUserFilter={isAdmin}
						defaultType="shipments"
					/>
				</motion.div>

				{/* Shipments List */}
				{loading ? (
					<div className="relative rounded-lg sm:rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-8 sm:p-12 text-center">
						<div className="inline-block animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-cyan-500/30 border-t-cyan-400"></div>
						<p className="mt-4 text-sm sm:text-base text-white/70">Loading shipments...</p>
					</div>
				) : shipments.length === 0 ? (
					<div className="relative rounded-lg sm:rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-8 sm:p-12 text-center">
						<Package className="w-12 h-12 sm:w-16 sm:h-16 text-white/30 mx-auto mb-4" />
						<p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">No shipments found</p>
						<Link href="/dashboard/shipments/new" className="inline-block">
							<Button className="bg-[#00bfff] text-white hover:bg-[#00a8e6] text-sm sm:text-base">
								<Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
								Create Your First Shipment
							</Button>
						</Link>
					</div>
				) : (
					<>
						{/* Results Count */}
						<div className="mb-4 sm:mb-6">
							<p className="text-xs sm:text-sm md:text-base text-white/70">
								Showing <span className="text-cyan-400 font-semibold">{shipments.length}</span> shipment{shipments.length !== 1 ? 's' : ''}
							</p>
						</div>

						{/* Shipments Grid */}
						<div className="space-y-3 sm:space-y-4 md:space-y-6">
							{shipments.map((shipment, index) => (
								<ShipmentRow
									key={shipment.id}
									{...shipment}
									showCustomer={isAdmin}
									isAdmin={isAdmin}
									onStatusUpdated={fetchShipments}
									delay={index * 0.1}
								/>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.5 }}
								className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
							>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									disabled={currentPage === 1}
									className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-xs sm:text-sm"
								>
									<ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
									Previous
								</Button>
								<span className="text-xs sm:text-sm text-white/70 px-4">
									Page {currentPage} of {totalPages}
								</span>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
									className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto text-xs sm:text-sm"
								>
									Next
									<ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
								</Button>
							</motion.div>
						)}
					</>
				)}
			</Section>
		</>
	);
}
