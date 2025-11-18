'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Package, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Section from '@/components/layout/Section';
import SmartSearch, { SearchFilters } from '@/components/dashboard/SmartSearch';

interface ContainerItem {
	id: string;
}

interface ContainerInvoice {
	id: string;
}

interface Container {
	id: string;
	containerNumber: string;
	status: string;
	createdAt: string;
	items: ContainerItem[];
	invoices: ContainerInvoice[];
	shipment?: {
		trackingNumber: string;
		status: string;
	};
}

export default function ContainersPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [containers, setContainers] = useState<Container[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchFilters, setSearchFilters] = useState<SearchFilters>({
		query: '',
		type: 'items',
	});

	useEffect(() => {
		if (status === 'loading') return;

		const role = session?.user?.role;
		if (!session || role !== 'admin') {
			router.replace('/dashboard');
			return;
		}

		fetchContainers();
	}, [session, status, router]);

	const fetchContainers = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/containers');
			if (response.ok) {
				const data = (await response.json()) as { containers?: Container[] };
				setContainers(data.containers ?? []);
			}
		} catch (error) {
			console.error('Error fetching containers:', error);
		} finally {
			setLoading(false);
		}
	};

	const handleSearch = (filters: SearchFilters) => {
		setSearchFilters(filters);
	};

	const filteredContainers = containers.filter((container) => {
		const query = searchFilters.query.toLowerCase();
		if (!query) return true;
		
		return (
			container.containerNumber.toLowerCase().includes(query) ||
			(container.shipment?.trackingNumber && container.shipment.trackingNumber.toLowerCase().includes(query))
		);
	});

	if (status === 'loading' || loading) {
		return (
			<div className="min-h-screen bg-[#020817] flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-400"></div>
			</div>
		);
	}

	const role = session?.user?.role;
	if (!session || role !== 'admin') {
		return null;
	}

	return (
		<>
			{/* Header */}
			<Section className="relative bg-[#020817] py-6 sm:py-12 lg:py-16 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />
				<div className="absolute inset-0 opacity-[0.03]">
					<svg className="w-full h-full" preserveAspectRatio="none">
						<defs>
							<pattern id="grid-containers" width="40" height="40" patternUnits="userSpaceOnUse">
								<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid-containers)" className="text-cyan-400" />
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
							<h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white leading-tight break-words">Containers</h1>
							<p className="text-sm sm:text-lg md:text-xl text-white/70">Manage containers and items</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="w-full sm:w-auto"
						>
							<Link href="/dashboard/containers/new" className="block">
								<Button
									size="lg"
									className="group relative overflow-hidden bg-[#00bfff] text-white hover:bg-[#00a8e6] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base md:text-lg font-semibold w-full sm:w-auto"
								>
									<Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
									New Container
								</Button>
							</Link>
						</motion.div>
					</div>
				</div>
			</Section>

			{/* Main Content */}
			<Section className="bg-[#020817] py-6 sm:py-12 lg:py-16">
				{/* Smart Search */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="mb-6 sm:mb-8"
				>
					<SmartSearch
						onSearch={handleSearch}
						placeholder="Search containers by number or tracking number..."
						showTypeFilter={false}
						showStatusFilter={false}
						showDateFilter={true}
						showPriceFilter={false}
						showUserFilter={false}
						defaultType="items"
					/>
				</motion.div>

				{/* Containers List */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<div className="flex items-center justify-between mb-4 sm:mb-6">
						<h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
							All Containers ({filteredContainers.length})
						</h2>
					</div>

					{filteredContainers.length === 0 ? (
						<div className="relative rounded-lg sm:rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-8 sm:p-12 text-center">
							<Package className="w-12 h-12 sm:w-16 sm:h-16 text-white/30 mx-auto mb-4" />
							<p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">No containers found</p>
							<Link href="/dashboard/containers/new" className="inline-block">
								<Button className="bg-[#00bfff] text-white hover:bg-[#00a8e6] text-sm sm:text-base">
									<Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
									Create Your First Container
								</Button>
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
							{filteredContainers.map((container, index) => (
								<motion.div
									key={container.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.05 }}
									className="relative rounded-lg sm:rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-4 sm:p-6 hover:border-cyan-500/50 transition-all duration-300 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10"
								>
									<div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
										<div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
											<div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
												<Package className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
											</div>
											<div className="min-w-0 flex-1">
												<h3 className="text-base sm:text-lg font-semibold text-white truncate">{container.containerNumber}</h3>
												<p className="text-xs sm:text-sm text-white/60">
													{container.items.length} {container.items.length === 1 ? 'item' : 'items'}
												</p>
											</div>
										</div>
										<span
											className={`px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-full flex-shrink-0 ${
												container.status === 'ACTIVE'
													? 'bg-green-500/20 text-green-400 border border-green-500/30'
													: 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
											}`}
										>
											{container.status}
										</span>
									</div>

									{container.shipment && container.shipment.trackingNumber && (
										<div className="mb-3 sm:mb-4 p-2 sm:p-3 rounded-lg bg-[#020817]/50 border border-cyan-500/20">
											<p className="text-[10px] sm:text-xs text-white/60 mb-1">Shipment</p>
											<p className="text-xs sm:text-sm font-medium text-cyan-400 truncate">{container.shipment.trackingNumber}</p>
										</div>
									)}

									<div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-cyan-500/10 gap-2">
										<div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/60 min-w-0 flex-1">
											<span className="flex items-center gap-1 truncate">
												<FileText className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
												<span className="truncate">{container.invoices.length} {container.invoices.length === 1 ? 'invoice' : 'invoices'}</span>
											</span>
										</div>
										<Link href={`/dashboard/containers/${container.id}`} className="flex-shrink-0">
											<Button
												variant="outline"
												size="sm"
												className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs sm:text-sm"
											>
												<Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
												View
											</Button>
										</Link>
									</div>
								</motion.div>
							))}
						</div>
					)}
				</motion.div>
			</Section>
		</>
	);
}

