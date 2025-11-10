'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
	Activity,
	BarChart3,
	TrendingUp,
	CreditCard,
	AlertTriangle,
	Package,
	User as UserIcon,
	Layers,
	RefreshCcw,
} from 'lucide-react';
import {
	ResponsiveContainer,
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	BarChart,
	Bar,
	PieChart,
	Pie,
	Cell,
	Legend,
} from 'recharts';

import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';

interface SummaryRow {
	totalShipments: number;
	activeShipments: number;
	adminUsers: number;
	totalRevenue: number;
	overdueInvoices: number;
	activeContainers: number;
}

interface StatusDatum {
	status: string;
	count: number;
}

interface MonthDatum {
	month: string;
	count?: number;
	totalUSD?: number;
}

interface InvoiceStatusDatum {
	status: string;
	count: number;
	totalUSD: number;
}

interface OutstandingInvoice {
	id: string;
	invoiceNumber: string;
	status: string;
	totalUSD: number;
	dueDate: string | null;
}

interface TopCustomer {
	userId: string;
	name: string;
	email: string;
	shipmentCount: number;
	revenue: number;
	lastShipmentAt: string | null;
}

interface AnalyticsPayload {
	summary: SummaryRow;
	shipmentsByStatus: StatusDatum[];
	shipmentsByMonth: Array<Required<Pick<MonthDatum, 'month' | 'count'>>>;
	revenueByMonth: Array<Required<Pick<MonthDatum, 'month' | 'totalUSD'>>>;
	invoiceStatusDistribution: InvoiceStatusDatum[];
	outstandingInvoices: OutstandingInvoice[];
	topCustomers: TopCustomer[];
	lastUpdated: string;
}

const COLORS = ['#22d3ee', '#818cf8', '#f472b6', '#f97316', '#34d399', '#facc15', '#38bdf8'];

const formatCurrency = (value: number) =>
	new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(
		Number.isFinite(value) ? value : 0,
	);

const formatDate = (value: string | null) => {
	if (!value) return '—';
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return '—';
	return date.toLocaleDateString();
};

export default function AnalyticsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	const [data, setData] = useState<AnalyticsPayload | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [refreshing, setRefreshing] = useState(false);

	const isAdmin = session?.user?.role === 'admin';

	useEffect(() => {
		if (status === 'loading') return;
		if (!session || !isAdmin) {
			router.replace('/dashboard');
			return;
		}

		const fetchAnalytics = async () => {
			try {
				setLoading(true);
				const response = await fetch('/api/analytics');
				if (!response.ok) throw new Error('Failed to load analytics payload.');
				const payload: AnalyticsPayload = await response.json();
				setData(payload);
				setError(null);
			} catch (err: unknown) {
				console.error(err);
				setError(err instanceof Error ? err.message : 'Unexpected analytics error.');
			} finally {
				setLoading(false);
			}
		};

		fetchAnalytics();
	}, [session, status, isAdmin, router]);

	const handleRefresh = async () => {
		setRefreshing(true);
		try {
			const response = await fetch('/api/analytics', { cache: 'no-store' });
			if (!response.ok) throw new Error('Unable to refresh analytics.');
			const payload: AnalyticsPayload = await response.json();
			setData(payload);
			setError(null);
		} catch (err: unknown) {
			console.error(err);
			setError(err instanceof Error ? err.message : 'Unexpected analytics error.');
		} finally {
			setRefreshing(false);
		}
	};

	const summaryCards = useMemo(() => {
		if (!data) return [];
		const summary = data.summary;
		return [
			{
				label: 'Total Shipments',
				value: summary.totalShipments,
				icon: Package,
				description: 'All shipments recorded in Jacxi.',
				accent: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-200',
			},
			{
				label: 'Active Shipments',
				value: summary.activeShipments,
				icon: Activity,
				description: 'Currently moving through the network.',
				accent: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-200',
			},
			{
				label: 'Total Revenue',
				value: formatCurrency(summary.totalRevenue),
				icon: TrendingUp,
				description: 'Paid invoices converted to USD.',
				accent: 'border-purple-500/30 bg-purple-500/10 text-purple-200',
			},
			{
				label: 'Team Admins',
				value: summary.adminUsers,
				icon: UserIcon,
				description: 'Administrators with dashboard access.',
				accent: 'border-blue-500/30 bg-blue-500/10 text-blue-200',
			},
			{
				label: 'Overdue Invoices',
				value: summary.overdueInvoices,
				icon: AlertTriangle,
				description: 'Invoices past due date & unpaid.',
				accent: 'border-amber-500/30 bg-amber-500/10 text-amber-200',
			},
			{
				label: 'Active Containers',
				value: summary.activeContainers,
				icon: Layers,
				description: 'Containers currently assigned & active.',
				accent: 'border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-200',
			},
		];
	}, [data]);

	if (status === 'loading' || loading) {
		return (
			<div className="min-h-screen bg-[#020817] flex items-center justify-center">
				<div className="animate-spin rounded-full h-12 w-12 border-4 border-cyan-500/30 border-t-cyan-400" />
			</div>
		);
	}

	if (!session || !isAdmin || !data) {
		return null;
	}

	return (
		<>
			<Section className="relative bg-[#020817] py-8 sm:py-12 lg:py-16 overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />
				<div className="absolute inset-0 opacity-[0.03]">
					<svg className="w-full h-full" preserveAspectRatio="none">
						<defs>
							<pattern id="grid-analytics" width="40" height="40" patternUnits="userSpaceOnUse">
								<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid-analytics)" className="text-cyan-400" />
					</svg>
				</div>

				<div className="relative z-10 space-y-6">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
						<div className="space-y-2">
							<motion.h1
								initial={{ opacity: 0, y: 18 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5 }}
								className="text-3xl sm:text-4xl font-semibold text-white"
							>
								Analytics Overview
							</motion.h1>
							<motion.p
								initial={{ opacity: 0, y: 18 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: 0.1 }}
								className="text-lg text-white/70 max-w-2xl"
							>
								Real-time shipment, revenue, and invoicing intelligence for Jacxi operations.
							</motion.p>
						</div>
						<div className="flex flex-wrap gap-3">
							<Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10" onClick={handleRefresh} disabled={refreshing}>
								<RefreshCcw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
								{refreshing ? 'Refreshing…' : 'Refresh data'}
							</Button>
							<Link href="/dashboard/shipments">
								<Button variant="outline" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10">
									<Package className="w-4 h-4 mr-2" />
									Go to shipments
								</Button>
							</Link>
						</div>
					</div>

					{error && (
						<div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-sm">
							{error}
						</div>
					)}

					<div className="text-xs text-white/40">Updated {formatDate(data.lastUpdated)}</div>

					<motion.div
						initial={{ opacity: 0, y: 18 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
					>
						{summaryCards.map((card) => {
							const Icon = card.icon;
							return (
								<div key={card.label} className={`rounded-xl border ${card.accent} backdrop-blur-md p-5 shadow-lg`}> 
									<div className="flex items-center justify-between">
										<div>
											<p className="text-xs uppercase tracking-wider text-white/60">{card.label}</p>
											<p className="text-2xl font-semibold text-white mt-2">{card.value}</p>
										</div>
										<div className="rounded-lg bg-black/20 p-2"> 
											<Icon className="w-5 h-5 text-white" />
										</div>
									</div>
									<p className="text-xs text-white/50 mt-3">{card.description}</p>
								</div>
							);
						})}
					</motion.div>
				</div>
			</Section>

			<Section className="bg-[#020817] py-8 sm:py-12">
				<div className="max-w-7xl mx-auto space-y-8">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="rounded-2xl border border-cyan-500/30 bg-[#0a1628]/70 backdrop-blur-md p-6 shadow-lg shadow-cyan-500/10">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-white flex items-center gap-2">
									<Activity className="w-5 h-5" />
									Shipment volume (6 mo)
								</h2>
							</div>
							<div className="h-72">
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={data.shipmentsByMonth}>
										<CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
										<XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
										<YAxis allowDecimals={false} stroke="#94a3b8" tickLine={false} axisLine={false} />
										<Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }} />
										<Line type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
									</LineChart>
								</ResponsiveContainer>
							</div>
						</div>

						<div className="rounded-2xl border border-purple-500/30 bg-[#0a1628]/70 backdrop-blur-md p-6 shadow-lg shadow-purple-500/10">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-white flex items-center gap-2">
									<BarChart3 className="w-5 h-5" />
									Revenue (USD, 6 mo)
								</h2>
								<div className="text-xs text-white/40">Includes paid invoices</div>
							</div>
							<div className="h-72">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={data.revenueByMonth}>
										<CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
										<XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
										<YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} stroke="#94a3b8" tickLine={false} axisLine={false} />
										<Tooltip
											contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #312e81' }}
											formatter={(value: number) => formatCurrency(value)}
										/>
										<Bar dataKey="totalUSD" fill="#a855f7" radius={[8, 8, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</div>
					</div>

					<div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
						<div className="rounded-2xl border border-sky-500/30 bg-[#0a1628]/70 backdrop-blur-md p-6 shadow-lg shadow-sky-500/10 xl:col-span-2">
							<h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
								<Package className="w-5 h-5" />
								Shipments by status
							</h2>
							<div className="overflow-x-auto">
								<table className="min-w-full text-sm">
									<thead>
										<tr className="text-white/60 uppercase tracking-wider border-b border-white/5">
											<th className="py-3 text-left">Status</th>
											<th className="py-3 text-right">Shipments</th>
										</tr>
									</thead>
									<tbody>
										{data.shipmentsByStatus.map((row) => (
											<tr key={row.status} className="border-b border-white/5 hover:bg-white/5">
												<td className="py-3 text-white/80">{row.status.replace(/_/g, ' ')}</td>
												<td className="py-3 text-right text-white/90 font-medium">{row.count}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>

						<div className="rounded-2xl border border-emerald-500/30 bg-[#0a1628]/70 backdrop-blur-md p-6 shadow-lg shadow-emerald-500/10">
							<h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
								<CreditCard className="w-5 h-5" />
								Invoices
							</h2>
							<div className="h-64">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie data={data.invoiceStatusDistribution as unknown as Record<string, unknown>[]} dataKey="count" nameKey="status" innerRadius={50} outerRadius={80} paddingAngle={4}>
											{data.invoiceStatusDistribution.map((entry, idx) => (
												<Cell key={entry.status} fill={COLORS[idx % COLORS.length]} />
											))}
										</Pie>
										<Tooltip
											contentStyle={{ backgroundColor: '#022c4a', border: '1px solid #0f4c75' }}
											formatter={(value: number, name: string, payload) => [value, `${payload?.payload?.status ?? name}`]}
										/>
										<Legend wrapperStyle={{ color: '#cbd5f5' }} />
									</PieChart>
								</ResponsiveContainer>
							</div>
							<ul className="mt-4 space-y-2 text-sm text-white/70">
								{data.invoiceStatusDistribution.map((entry, idx) => (
									<li key={entry.status} className="flex items-center justify-between">
										<span className="flex items-center gap-2">
											<span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: COLORS[idx % COLORS.length] }} />
											{entry.status}
										</span>
										<span>{entry.count} · {formatCurrency(entry.totalUSD)}</span>
									</li>
								))}
							</ul>
						</div>
					</div>

					<div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
						<div className="rounded-2xl border border-amber-500/30 bg-[#0a1628]/70 backdrop-blur-md p-6 shadow-lg shadow-amber-500/10">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-semibold text-white flex items-center gap-2">
									<AlertTriangle className="w-5 h-5" />
									Outstanding invoices
								</h2>
								<Link href="/dashboard/invoices" className="text-xs text-white/50 hover:text-white">View all</Link>
							</div>
							<div className="space-y-3">
								{data.outstandingInvoices.length === 0 && (
									<div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
										No overdue invoices — great job!
									</div>
								)}
								{data.outstandingInvoices.map((invoice) => (
									<div key={invoice.id} className="rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm">
										<div className="flex items-center justify-between text-white">
											<span className="font-semibold">{invoice.invoiceNumber}</span>
											<span>{formatCurrency(invoice.totalUSD)}</span>
										</div>
										<div className="text-xs text-white/60 mt-1 flex items-center justify-between">
											<span>{invoice.status}</span>
											<span>Due {formatDate(invoice.dueDate)}</span>
										</div>
									</div>
								))}
							</div>
						</div>

						<div className="rounded-2xl border border-cyan-500/30 bg-[#0a1628]/70 backdrop-blur-md p-6 shadow-lg shadow-cyan-500/10">
							<h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
								<UserIcon className="w-5 h-5" />
								Top customers
							</h2>
							<div className="space-y-3">
								{data.topCustomers.length === 0 && (
									<div className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/60">
										No customer data yet.
									</div>
								)}
								{data.topCustomers.map((customer) => (
									<div key={customer.userId} className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm">
										<div className="flex items-center justify-between text-white">
											<div>
												<p className="font-semibold">{customer.name}</p>
												<p className="text-xs text-white/50">{customer.email}</p>
											</div>
											<div className="text-right">
												<p>{formatCurrency(customer.revenue)}</p>
												<p className="text-xs text-white/50">Shipments: {customer.shipmentCount}</p>
											</div>
										</div>
										<div className="text-xs text-white/50 mt-1">Last shipment {formatDate(customer.lastShipmentAt)}</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Section>
		</>
	);
}
