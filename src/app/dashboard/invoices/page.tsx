'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Receipt, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import Section from '@/components/layout/Section';

interface Invoice {
	id: string;
	invoiceNumber: string;
	status: string;
	totalUSD: number;
	totalAED: number;
	dueDate: string | null;
	paidDate: string | null;
	overdue: boolean;
	createdAt: string;
	container: {
		containerNumber: string;
	};
}

export default function InvoicesPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [loading, setLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');

	const fetchInvoices = useCallback(async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/invoices');
			if (!response.ok) {
				setInvoices([]);
				return;
			}
			const data = (await response.json()) as { invoices?: Invoice[] };
			setInvoices(data.invoices ?? []);
		} catch (error) {
			console.error('Error fetching invoices:', error);
			setInvoices([]);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		if (status === 'loading') return;
		const role = session?.user?.role;
		if (!session || role !== 'admin') {
			router.replace('/dashboard');
			return;
		}
		void fetchInvoices();
	}, [fetchInvoices, router, session, status]);

	const filteredInvoices = useMemo(
		() =>
			invoices.filter((invoice) => {
				const term = searchTerm.trim().toLowerCase();
				const matchesSearch =
					invoice.invoiceNumber.toLowerCase().includes(term) ||
					invoice.container.containerNumber.toLowerCase().includes(term);
				const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
				return matchesSearch && matchesStatus;
			}),
		[invoices, searchTerm, statusFilter]
	);

	const stats = useMemo(
		() => ({
			total: invoices.length,
			paid: invoices.filter((i) => i.status === 'PAID').length,
			overdue: invoices.filter((i) => i.overdue || i.status === 'OVERDUE').length,
			pending: invoices.filter((i) => i.status === 'SENT' || i.status === 'DRAFT').length,
		}),
		[invoices]
	);

	const getStatusColor = (status: string, overdue: boolean) => {
		if (status === 'PAID') return 'bg-green-500/20 text-green-400 border-green-500/30';
		if (overdue || status === 'OVERDUE') return 'bg-red-500/20 text-red-400 border-red-500/30';
		if (status === 'SENT') return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
		return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
	};

	const getStatusIcon = (status: string) => {
		if (status === 'PAID') return <CheckCircle className="w-4 h-4" />;
		if (status === 'OVERDUE') return <AlertCircle className="w-4 h-4" />;
		return <Clock className="w-4 h-4" />;
	};

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
			<Section className="relative bg-[#020817] py-8 sm:py-12 lg:py-16 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />
				<div className="absolute inset-0 opacity-[0.03]">
					<svg className="w-full h-full" preserveAspectRatio="none">
						<defs>
							<pattern id="grid-invoices" width="40" height="40" patternUnits="userSpaceOnUse">
								<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid-invoices)" className="text-cyan-400" />
					</svg>
				</div>

				<div className="relative z-10">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
						<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="space-y-2">
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">Invoices</h1>
							<p className="text-lg sm:text-xl text-white/70">Manage invoices and payments</p>
						</motion.div>
					</div>
				</div>
			</Section>

			<Section className="bg-[#020817] py-8 sm:py-12 lg:py-16">
				{/* Stats */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 shadow-lg shadow-cyan-500/10">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-white/70 mb-1">Total Invoices</p>
								<p className="text-3xl font-bold text-white">{stats.total}</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
								<Receipt className="w-6 h-6 text-cyan-400" />
							</div>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }} className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-green-500/30 p-6 shadow-lg shadow-green-500/10">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-white/70 mb-1">Paid</p>
								<p className="text-3xl font-bold text-white">{stats.paid}</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center">
								<CheckCircle className="w-6 h-6 text-green-400" />
							</div>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-red-500/30 p-6 shadow-lg shadow-red-500/10">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-white/70 mb-1">Overdue</p>
								<p className="text-3xl font-bold text-white">{stats.overdue}</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
								<AlertCircle className="w-6 h-6 text-red-400" />
							</div>
						</div>
					</motion.div>

					<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }} className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-yellow-500/30 p-6 shadow-lg shadow-yellow-500/10">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-white/70 mb-1">Pending</p>
								<p className="text-3xl font-bold text-white">{stats.pending}</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center">
								<Clock className="w-6 h-6 text-yellow-400" />
							</div>
						</div>
					</motion.div>
				</div>

				{/* Filters */}
				<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-8">
					<div className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 shadow-lg shadow-cyan-500/10">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400/70" />
								<Input type="text" placeholder="Search by invoice number or container..." className="w-full pl-10 pr-4 py-2 bg-[#020817] border border-cyan-500/30 rounded-lg text-white placeholder:text-white/50 focus:ring-2 focus:ring-cyan-500 focus:border-transparent" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
							</div>
							<div className="relative">
								<Receipt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400/70" />
								<select className="w-full pl-10 pr-4 py-2 bg-[#020817] border border-cyan-500/30 rounded-lg text-white appearance-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
									<option value="all" className="bg-[#020817] text-white">All Status</option>
									<option value="DRAFT" className="bg-[#020817] text-white">Draft</option>
									<option value="SENT" className="bg-[#020817] text-white">Sent</option>
									<option value="PAID" className="bg-[#020817] text-white">Paid</option>
									<option value="OVERDUE" className="bg-[#020817] text-white">Overdue</option>
								</select>
							</div>
						</div>
					</div>
				</motion.div>

				{/* Invoices List */}
				<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl sm:text-3xl font-bold text-white">All Invoices ({filteredInvoices.length})</h2>
					</div>

					{filteredInvoices.length === 0 ? (
						<div className="relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-12 text-center">
							<Receipt className="w-16 h-16 text-white/30 mx-auto mb-4" />
							<p className="text-white/70 mb-6">No invoices found</p>
						</div>
					) : (
						<div className="space-y-4 sm:space-y-6">
							{filteredInvoices.map((invoice, index) => (
								<Link key={invoice.id} href={`/dashboard/invoices/${invoice.id}`}>
									<motion.div
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.4, delay: index * 0.05 }}
										className="group relative rounded-xl bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 p-6 hover:border-cyan-500/60 hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
									>
										<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
											<div className="flex-1">
												<div className="flex items-center gap-3 mb-2 flex-wrap">
													<h3 className="text-lg sm:text-xl font-bold text-white">{invoice.invoiceNumber}</h3>
													<span className={`px-3 py-1 text-xs font-medium rounded-full border flex items-center gap-1 ${getStatusColor(invoice.status, invoice.overdue)}`}>
														{getStatusIcon(invoice.status)}
														{invoice.status} {invoice.overdue && '(Overdue)'}
													</span>
												</div>
												<p className="text-sm text-white/60">Container: {invoice.container.containerNumber}</p>
												{invoice.dueDate && (
													<p className="text-sm text-white/60 mt-1">
														Due: {new Date(invoice.dueDate).toLocaleDateString()}
													</p>
												)}
											</div>
											<div className="text-right">
												<p className="text-lg sm:text-xl font-bold text-cyan-400">${invoice.totalUSD.toFixed(2)}</p>
												<p className="text-sm text-white/60">{invoice.totalAED.toFixed(2)} AED</p>
											</div>
										</div>
									</motion.div>
								</Link>
							))}
						</div>
					)}
				</motion.div>
			</Section>
		</>
	);
}

