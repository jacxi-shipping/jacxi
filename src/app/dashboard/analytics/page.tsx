'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
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
import { Box, Button, Typography, Fade, Slide, Zoom, CircularProgress } from '@mui/material';

import Section from '@/components/layout/Section';
import PageHeader from '@/components/dashboard/PageHeader';

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
	const show = true;

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
				accent: 'border-cyan-500/40 bg-cyan-500/15 text-cyan-200',
				glow: 'rgba(6, 182, 212, 0.3)',
			},
			{
				label: 'Active Shipments',
				value: summary.activeShipments,
				icon: Activity,
				description: 'Currently moving through the network.',
				accent: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200',
				glow: 'rgba(16, 185, 129, 0.3)',
			},
			{
				label: 'Total Revenue',
				value: formatCurrency(summary.totalRevenue),
				icon: TrendingUp,
				description: 'Paid invoices converted to USD.',
				accent: 'border-purple-500/40 bg-purple-500/15 text-purple-200',
				glow: 'rgba(168, 85, 247, 0.3)',
			},
			{
				label: 'Team Admins',
				value: summary.adminUsers,
				icon: UserIcon,
				description: 'Administrators with dashboard access.',
				accent: 'border-blue-500/40 bg-blue-500/15 text-blue-200',
				glow: 'rgba(59, 130, 246, 0.3)',
			},
			{
				label: 'Overdue Invoices',
				value: summary.overdueInvoices,
				icon: AlertTriangle,
				description: 'Invoices past due date & unpaid.',
				accent: 'border-amber-500/40 bg-amber-500/15 text-amber-200',
				glow: 'rgba(245, 158, 11, 0.3)',
			},
			{
				label: 'Active Containers',
				value: summary.activeContainers,
				icon: Layers,
				description: 'Containers currently assigned & active.',
				accent: 'border-fuchsia-500/40 bg-fuchsia-500/15 text-fuchsia-200',
				glow: 'rgba(217, 70, 239, 0.3)',
			},
		];
	}, [data]);

	if (status === 'loading' || loading) {
		return (
			<Box
				sx={{
					minHeight: '100vh',
					background: '#020817',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CircularProgress
					size={60}
					sx={{
						color: 'rgb(34, 211, 238)',
						filter: 'drop-shadow(0 0 15px rgba(34, 211, 238, 0.5))',
					}}
				/>
			</Box>
		);
	}

	if (!session || !isAdmin || !data) {
		return null;
	}

	return (
		<Section>
			<div className="flex min-h-0 flex-col gap-4">
				{error && (
					<Fade in timeout={600}>
						<Box className="rounded-3xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
							{error}
						</Box>
					</Fade>
				)}

				<PageHeader
					title="Analytics"
					description="Live pulse of shipments, revenue, and team capacity across Jacxi."
					actions={
						<Button
							variant="outlined"
							onClick={handleRefresh}
							disabled={refreshing}
							startIcon={<RefreshCcw className="h-4 w-4" />}
							sx={{ borderRadius: 999 }}
						>
							{refreshing ? 'Refreshing...' : 'Refresh'}
						</Button>
					}
					meta={[
						{ label: 'Shipments', value: summaryCards[0]?.value ?? 0, hint: 'Total volume', tone: 'cyan' },
						{ label: 'Revenue', value: formatCurrency(data.summary.totalRevenue), hint: 'Paid invoices', tone: 'violet' },
						{ label: 'Containers', value: data.summary.activeContainers, hint: 'Active', tone: 'emerald' },
						{ label: 'Overdue', value: data.summary.overdueInvoices, hint: 'Invoices', tone: 'amber' },
					]}
				/>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))', xl: 'repeat(3, minmax(0, 1fr))' },
						gap: 1.5,
					}}
				>
					{summaryCards.map((card, index) => {
						const Icon = card.icon;
						return (
							<Zoom key={card.label} in={show} timeout={600} style={{ transitionDelay: `${(index + 2) * 120}ms` }}>
								<Box
									className="dashboard-panel dashboard-panel--tight"
									sx={{
										display: 'flex',
										flexDirection: 'column',
										gap: 1,
									}}
								>
									<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
										<Typography sx={{ fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
											{card.label}
										</Typography>
										<Icon style={{ width: 20, height: 20, color: 'white' }} />
									</Box>
									<Typography sx={{ fontSize: '1.6rem', fontWeight: 700, color: 'white' }}>{card.value}</Typography>
									<Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)' }}>{card.description}</Typography>
								</Box>
							</Zoom>
						);
					})}
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
						gap: 2,
					}}
				>
					<Slide in={show} direction="up" timeout={800}>
						<Box className="dashboard-panel">
							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
								<Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
									<Activity style={{ width: 18, height: 18 }} />
									Shipment volume (6 mo)
								</Typography>
							</Box>
							<Box sx={{ height: 280 }}>
								<ResponsiveContainer width="100%" height="100%">
									<LineChart data={data.shipmentsByMonth}>
										<CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
										<XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
										<YAxis allowDecimals={false} stroke="#94a3b8" tickLine={false} axisLine={false} />
										<Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }} />
										<Line type="monotone" dataKey="count" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
									</LineChart>
								</ResponsiveContainer>
							</Box>
						</Box>
					</Slide>

					<Slide in={show} direction="up" timeout={800} style={{ transitionDelay: '120ms' }}>
						<Box className="dashboard-panel">
							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
								<Typography sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
									<BarChart3 style={{ width: 18, height: 18 }} />
									Revenue (6 mo)
								</Typography>
								<Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>Paid invoices</Typography>
							</Box>
							<Box sx={{ height: 280 }}>
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={data.revenueByMonth}>
										<CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
										<XAxis dataKey="month" stroke="#94a3b8" tickLine={false} axisLine={false} />
										<YAxis tickFormatter={(value) => `${Math.round(value / 1000)}k`} stroke="#94a3b8" tickLine={false} axisLine={false} />
										<Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #312e81', borderRadius: '8px' }} formatter={(value: number) => formatCurrency(value)} />
										<Bar dataKey="totalUSD" fill="#a855f7" radius={[8, 8, 0, 0]} />
									</BarChart>
								</ResponsiveContainer>
							</Box>
						</Box>
					</Slide>
				</Box>
			</div>
		</Section>
	);
}
