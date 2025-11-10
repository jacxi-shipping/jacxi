'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plus, Search, Package, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Section from '@/components/layout/Section';

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
	const [searchTerm, setSearchTerm] = useState('');

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

	const filteredContainers = containers.filter((container) =>
		container.containerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
		(container.shipment?.trackingNumber && container.shipment.trackingNumber.toLowerCase().includes(searchTerm.toLowerCase()))
	);

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
			<Section className="relative bg-[#020817] py-8 sm:py-12 lg:py-16 overflow-hidden">
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
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="space-y-2"
						>
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">Containers</h1>
							<p className="text-lg sm:text-xl text-white/70">Manage containers and items</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
						>
							<Link href="/dashboard/containers/new">
								<Button
									size="lg"
									className="group relative overflow-hidden bg-[#00bfff] text-white hover:bg-[#00a8e6] shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 px-6 py-3 text-base sm:text-lg font-semibold"
								>
									<Plus className="w-5 h-5 mr-2" />
									New Container
								</Button>
							</Link>
						</motion.div>
					</div>
				</div>
			</Section>

			{/* Main Content */}
			<Section className="bg-[#020817] py-8 sm:py-12 lg:py-16">
				{/* Search */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="mb-8"
				>
					<div className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 shadow-lg shadow-cyan-500/10">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400/70" />
							<Input
								type="text"
								placeholder="Search by container number or tracking number..."
								className="w-full pl-10 pr-4 py-2 bg-[#020817] border border-cyan-500/30 rounded-lg text-white placeholder:text-white/50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>
				</motion.div>

				{/* Containers List */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.4 }}
				>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl sm:text-3xl font-bold text-white">
							All Containers ({filteredContainers.length})
						</h2>
					</div>

					{filteredContainers.length === 0 ? (
						<div className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-12 text-center">
							<Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
							<p className="text-white/70 mb-6">No containers found</p>
							<Link href="/dashboard/containers/new">
								<Button className="bg-[#00bfff] text-white hover:bg-[#00a8e6]">
									<Plus className="w-5 h-5 mr-2" />
									Create Your First Container
								</Button>
							</Link>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
							{filteredContainers.map((container, index) => (
								<motion.div
									key={container.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: index * 0.05 }}
									className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 hover:border-cyan-500/50 transition-all duration-300 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10"
								>
									<div className="flex items-start justify-between mb-4">
										<div className="flex items-center gap-3">
											<div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 flex items-center justify-center">
												<Package className="w-6 h-6 text-cyan-400" />
											</div>
											<div>
												<h3 className="text-lg font-semibold text-white">{container.containerNumber}</h3>
												<p className="text-sm text-white/60">
													{container.items.length} {container.items.length === 1 ? 'item' : 'items'}
												</p>
											</div>
										</div>
										<span
											className={`px-2 py-1 text-xs font-medium rounded-full ${
												container.status === 'ACTIVE'
													? 'bg-green-500/20 text-green-400 border border-green-500/30'
													: 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
											}`}
										>
											{container.status}
										</span>
									</div>

									{container.shipment && container.shipment.trackingNumber && (
										<div className="mb-4 p-3 rounded-lg bg-[#020817]/50 border border-cyan-500/20">
											<p className="text-xs text-white/60 mb-1">Shipment</p>
											<p className="text-sm font-medium text-cyan-400">{container.shipment.trackingNumber}</p>
										</div>
									)}

									<div className="flex items-center justify-between pt-4 border-t border-cyan-500/10">
										<div className="flex items-center gap-4 text-sm text-white/60">
											<span className="flex items-center gap-1">
												<FileText className="w-4 h-4" />
												{container.invoices.length} {container.invoices.length === 1 ? 'invoice' : 'invoices'}
											</span>
										</div>
										<Link href={`/dashboard/containers/${container.id}`}>
											<Button
												variant="outline"
												size="sm"
												className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
											>
												<Eye className="w-4 h-4 mr-1" />
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

