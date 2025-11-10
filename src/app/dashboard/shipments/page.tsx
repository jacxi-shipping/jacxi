'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Search, Filter, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import ShipmentRow from '@/components/dashboard/ShipmentRow';
import Section from '@/components/layout/Section';

type ShipmentsResponse = {
	shipments?: Shipment[];
	pagination?: {
		totalPages?: number;
	};
};

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
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const fetchShipments = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch(
				`/api/shipments?status=${statusFilter}&page=${currentPage}&limit=10`
			);
			const data = (await response.json()) as ShipmentsResponse;
			setShipments(data.shipments ?? []);
			setTotalPages(data.pagination?.totalPages ?? 1);
		} catch (error) {
			console.error('Error fetching shipments:', error);
		} finally {
			setLoading(false);
		}
	}, [statusFilter, currentPage]);

	useEffect(() => {
		fetchShipments();
	}, [fetchShipments]);

	const filteredShipments = shipments.filter(
		(shipment) =>
			shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
			shipment.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
			shipment.destination.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const isAdmin = session?.user?.role === 'admin';

	return (
		<>
			{/* Header */}
			<Section className="relative bg-[#020817] py-8 sm:py-12 lg:py-16 overflow-hidden">
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
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="space-y-2"
						>
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
								Shipments Management
							</h1>
							<p className="text-lg sm:text-xl text-white/70">
								Manage all shipments and track their status
							</p>
						</motion.div>
						{isAdmin && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.2 }}
							>
								<Link href="/dashboard/shipments/new">
									<Button
										size="lg"
										className="group relative overflow-hidden bg-[#00bfff] text-white hover:bg-[#00a8e6] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 px-6 py-3 text-base sm:text-lg font-semibold"
									>
										<Plus className="w-5 h-5 mr-2" />
										New Shipment
									</Button>
								</Link>
							</motion.div>
						)}
					</div>
				</div>
			</Section>

			{/* Main Content */}
			<Section className="bg-[#020817] py-8 sm:py-12">
				{/* Filters */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8 mb-8"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
						{/* Search */}
						<div className="relative">
							<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
							<input
								type="text"
								placeholder="Search by tracking, origin, or destination..."
								className="w-full pl-12 pr-4 py-3 bg-[#020817] border border-cyan-500/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>

						{/* Status Filter */}
						<div className="relative">
							<Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
							<select
								className="w-full pl-12 pr-4 py-3 bg-[#020817] border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all appearance-none cursor-pointer"
								value={statusFilter}
								onChange={(e) => setStatusFilter(e.target.value)}
							>
								<option value="all" className="bg-[#020817]">All Status</option>
								<option value="PENDING" className="bg-[#020817]">Pending</option>
								<option value="QUOTE_REQUESTED" className="bg-[#020817]">Quote Requested</option>
								<option value="QUOTE_APPROVED" className="bg-[#020817]">Quote Approved</option>
								<option value="PICKUP_SCHEDULED" className="bg-[#020817]">Pickup Scheduled</option>
								<option value="PICKUP_COMPLETED" className="bg-[#020817]">Pickup Completed</option>
								<option value="IN_TRANSIT" className="bg-[#020817]">In Transit</option>
								<option value="AT_PORT" className="bg-[#020817]">At Port</option>
								<option value="DELIVERED" className="bg-[#020817]">Delivered</option>
								<option value="CANCELLED" className="bg-[#020817]">Cancelled</option>
							</select>
						</div>
					</div>
				</motion.div>

				{/* Shipments List */}
				{loading ? (
					<div className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-12 text-center">
						<div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-400"></div>
						<p className="mt-4 text-white/70">Loading shipments...</p>
					</div>
				) : filteredShipments.length === 0 ? (
					<div className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-12 text-center">
						<Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
						<p className="text-white/70 mb-6">No shipments found</p>
						<Link href="/dashboard/shipments/new">
							<Button className="bg-[#00bfff] text-white hover:bg-[#00a8e6]">
								<Plus className="w-5 h-5 mr-2" />
								Create Your First Shipment
							</Button>
						</Link>
					</div>
				) : (
					<>
						{/* Results Count */}
						<div className="mb-6">
							<p className="text-sm sm:text-base text-white/70">
								Showing <span className="text-cyan-400 font-semibold">{filteredShipments.length}</span> shipment{filteredShipments.length !== 1 ? 's' : ''}
							</p>
						</div>

						{/* Shipments Grid */}
						<div className="space-y-4 sm:space-y-6">
							{filteredShipments.map((shipment, index) => (
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
								className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4"
							>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
									disabled={currentPage === 1}
									className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									<ChevronLeft className="w-4 h-4 mr-2" />
									Previous
								</Button>
								<span className="text-sm text-white/70 px-4">
									Page {currentPage} of {totalPages}
								</span>
								<Button
									variant="outline"
									size="sm"
									onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
									disabled={currentPage === totalPages}
									className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
								>
									Next
									<ChevronRight className="w-4 h-4 ml-2" />
								</Button>
							</motion.div>
						)}
					</>
				)}
			</Section>
		</>
	);
}
