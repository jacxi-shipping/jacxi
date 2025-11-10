'use client';

import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Section from '@/components/layout/Section';

type ContainerItem = {
	id: string;
	vin: string;
	lotNumber: string;
	auctionCity: string;
	freightCost?: number | null;
	towingCost?: number | null;
	clearanceCost?: number | null;
	vatCost?: number | null;
	customsCost?: number | null;
	otherCost?: number | null;
};

type ContainerInvoice = {
	id: string;
	invoiceNumber: string;
	status: string;
	totalUSD: number;
	totalAED: number;
};

type ContainerDetail = {
	id: string;
	containerNumber: string;
	items: ContainerItem[];
	invoices: ContainerInvoice[];
};

export default function ContainerDetailPage() {
	const { data: session, status } = useSession();
	const params = useParams();
	const router = useRouter();
	const [container, setContainer] = useState<ContainerDetail | null>(null);
	const [loading, setLoading] = useState(true);

	const containerIdRaw = params?.id;
	const containerId = Array.isArray(containerIdRaw) ? containerIdRaw[0] : containerIdRaw;

	const isAdmin = session?.user?.role === 'admin';

	const fetchContainer = useCallback(async () => {
		if (!containerId) return;

		try {
			setLoading(true);
			const response = await fetch(`/api/containers/${containerId}`);
			if (!response.ok) {
				setContainer(null);
				return;
			}

			const data = (await response.json()) as { container?: ContainerDetail };
			setContainer(data.container ?? null);
		} catch (error) {
			console.error('Error fetching container:', error);
			setContainer(null);
		} finally {
			setLoading(false);
		}
	}, [containerId]);

	useEffect(() => {
		if (status === 'loading') return;
		if (!session || !isAdmin) {
			router.replace('/dashboard');
			return;
		}
		void fetchContainer();
	}, [fetchContainer, isAdmin, router, session, status]);

	const items = container?.items ?? [];
	const invoices = container?.invoices ?? [];

	if (loading) {
		return (
			<div className="min-h-screen bg-[#020817] flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-400"></div>
			</div>
		);
	}

	if (!container) {
		return (
			<div className="min-h-screen bg-[#020817] flex items-center justify-center">
				<div className="text-center">
					<p className="text-white/70 mb-4">Container not found</p>
					<Link href="/dashboard/containers">
						<Button>Back to Containers</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<>
			<Section className="relative bg-[#020817] py-8 sm:py-12 lg:py-16 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />
				<div className="absolute inset-0 opacity-[0.03]">
					<svg className="w-full h-full" preserveAspectRatio="none">
						<defs>
							<pattern id="grid-container-detail" width="40" height="40" patternUnits="userSpaceOnUse">
								<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid-container-detail)" className="text-cyan-400" />
					</svg>
				</div>

				<div className="relative z-10">
					<div className="flex items-center gap-6">
						<Link href="/dashboard/containers">
							<Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
								<ArrowLeft className="w-4 h-4 mr-2" />
								Back
							</Button>
						</Link>
						<div>
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
								{container.containerNumber}
							</h1>
							<p className="text-lg sm:text-xl text-white/70 mt-2">Container Details</p>
						</div>
					</div>
				</div>
			</Section>

			<Section className="bg-[#020817] py-8 sm:py-12">
				<div className="max-w-7xl mx-auto space-y-8">
					{/* Items Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8"
					>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl sm:text-2xl font-bold text-white">Items ({items.length})</h2>
							<Button
								onClick={() => router.push(`/dashboard/containers/${container?.id}/items/new`)}
								className="bg-[#00bfff] text-white hover:bg-[#00a8e6]"
							>
								<Plus className="w-4 h-4 mr-2" />
								Add Item
							</Button>
						</div>

						{items.length > 0 ? (
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead>
										<tr className="border-b border-cyan-500/20">
											<th className="text-left py-3 px-4 text-sm font-medium text-white/70">VIN</th>
											<th className="text-left py-3 px-4 text-sm font-medium text-white/70">Lot #</th>
											<th className="text-left py-3 px-4 text-sm font-medium text-white/70">Auction City</th>
											<th className="text-right py-3 px-4 text-sm font-medium text-white/70">Total Cost</th>
										</tr>
									</thead>
									<tbody>
										{items.map((item) => {
											const totalCost =
												(item.freightCost ?? 0) +
												(item.towingCost ?? 0) +
												(item.clearanceCost ?? 0) +
												(item.vatCost ?? 0) +
												(item.customsCost ?? 0) +
												(item.otherCost ?? 0);
											return (
												<tr key={item.id} className="border-b border-cyan-500/10 hover:bg-[#020817]/50">
													<td className="py-3 px-4 text-sm text-white font-mono">{item.vin}</td>
													<td className="py-3 px-4 text-sm text-white">{item.lotNumber}</td>
													<td className="py-3 px-4 text-sm text-white">{item.auctionCity}</td>
													<td className="py-3 px-4 text-sm text-white text-right">${totalCost.toFixed(2)}</td>
												</tr>
											);
										})}
									</tbody>
								</table>
							</div>
						) : (
							<p className="text-center text-white/70 py-8">No items yet. Add items to this container.</p>
						)}
					</motion.div>

					{/* Invoices Section */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 }}
						className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 sm:p-8"
					>
						<div className="flex items-center justify-between mb-6">
							<h2 className="text-xl sm:text-2xl font-bold text-white">Invoices ({invoices.length})</h2>
							{items.length > 0 && (
								<Button
									onClick={() => router.push(`/dashboard/invoices/new?containerId=${container?.id}`)}
									className="bg-[#00bfff] text-white hover:bg-[#00a8e6]"
								>
									<Plus className="w-4 h-4 mr-2" />
									Create Invoice
								</Button>
							)}
						</div>

						{invoices.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{invoices.map((invoice) => (
									<Link key={invoice.id} href={`/dashboard/invoices/${invoice.id}`}>
										<div className="p-4 rounded-lg bg-[#020817]/50 border border-cyan-500/20 hover:border-cyan-500/40 transition-all">
											<div className="flex items-center justify-between mb-2">
												<span className="text-sm font-medium text-white">{invoice.invoiceNumber}</span>
												<span
													className={`px-2 py-1 text-xs rounded-full ${
														invoice.status === 'PAID'
															? 'bg-green-500/20 text-green-400'
															: invoice.status === 'OVERDUE'
															? 'bg-red-500/20 text-red-400'
															: 'bg-yellow-500/20 text-yellow-400'
													}`}
												>
													{invoice.status}
												</span>
											</div>
											<div className="flex items-center justify-between text-sm">
												<span className="text-white/60">Total</span>
												<span className="text-white font-semibold">
													${invoice.totalUSD.toFixed(2)} / {invoice.totalAED.toFixed(2)} AED
												</span>
											</div>
										</div>
									</Link>
								))}
							</div>
						) : (
							<p className="text-center text-white/70 py-8">No invoices yet. Create an invoice from items.</p>
						)}
					</motion.div>
				</div>
			</Section>
		</>
	);
}

