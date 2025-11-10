"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { Session } from 'next-auth';
import type { LucideIcon } from 'lucide-react';
import {
	LayoutDashboard,
	Package,
	FileText,
	Settings,
	User,
	LogOut,
	Menu,
	X,
	Plus,
	Search,
	BarChart3,
	Users,
	Container as ContainerIcon,
	Receipt,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

type NavigationItem = {
	name: string;
	href: string;
	icon: LucideIcon;
	adminOnly?: boolean;
};

const mainNavigation: NavigationItem[] = [
	{
		name: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboard,
	},
];

const shipmentNavigation: NavigationItem[] = [
	{
		name: 'Shipments',
		href: '/dashboard/shipments',
		icon: Package,
	},
	{
		name: 'New Shipment',
		href: '/dashboard/shipments/new',
		icon: Plus,
		adminOnly: true,
	},
];

const adminNavigation: NavigationItem[] = [
	{
		name: 'Analytics',
		href: '/dashboard/analytics',
		icon: BarChart3,
	},
	{
		name: 'Users',
		href: '/dashboard/users',
		icon: Users,
	},
	{
		name: 'Create User',
		href: '/dashboard/users/new',
		icon: User,
	},
	{
		name: 'Containers',
		href: '/dashboard/containers',
		icon: ContainerIcon,
	},
	{
		name: 'Invoices',
		href: '/dashboard/invoices',
		icon: Receipt,
	},
];

const otherNavigation: NavigationItem[] = [
	{
		name: 'Track Shipments',
		href: '/dashboard/tracking',
		icon: Search,
	},
	{
		name: 'Documents',
		href: '/dashboard/documents',
		icon: FileText,
	},
];

const settingsNavigation: NavigationItem[] = [
	{
		name: 'Profile',
		href: '/dashboard/profile',
		icon: User,
	},
	{
		name: 'Settings',
		href: '/dashboard/settings',
		icon: Settings,
	},
];

export default function Sidebar() {
	const [mobileOpen, setMobileOpen] = useState(false);
	const pathname = usePathname();
	const { data: session } = useSession();

	const handleSignOut = async () => {
		await signOut({ callbackUrl: '/' });
	};

	return (
		<>
			{/* Mobile Menu Button */}
			<div className="lg:hidden fixed top-4 left-4 z-50">
				<Button
					variant="ghost"
					size="icon"
					onClick={() => setMobileOpen(!mobileOpen)}
					className="bg-[#0a1628]/50 backdrop-blur-sm border border-cyan-500/30 text-white hover:bg-cyan-500/10"
				>
					{mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
				</Button>
			</div>

			{/* Mobile Overlay */}
			<AnimatePresence>
				{mobileOpen && (
					<>
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
							onClick={() => setMobileOpen(false)}
						/>

						{/* Mobile Sidebar */}
						<motion.div
							initial={{ x: -300 }}
							animate={{ x: 0 }}
							exit={{ x: -300 }}
							transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
							className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden"
						>
							<SidebarContent pathname={pathname} session={session} onSignOut={handleSignOut} onNavClick={() => setMobileOpen(false)} />
						</motion.div>
					</>
				)}
			</AnimatePresence>

			{/* Desktop Sidebar */}
			<aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 lg:left-0 z-30">
				<SidebarContent pathname={pathname} session={session} onSignOut={handleSignOut} />
			</aside>
		</>
	);
}

type NavItemProps = {
	item: NavigationItem;
	index: number;
	isActive: (href: string) => boolean;
	onNavClick?: () => void;
};

function NavItem({ item, index, isActive, onNavClick }: NavItemProps) {
	const Icon = item.icon;
	const active = isActive(item.href);

	return (
		<Link href={item.href} onClick={onNavClick}>
			<motion.div
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.2, delay: index * 0.03 }}
				whileHover={{ x: 2 }}
				className={cn(
					'group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 cursor-pointer',
					active ? 'bg-cyan-500/10 text-cyan-400' : 'text-white/70 hover:text-white hover:bg-white/5'
				)}
			>
				{active && (
					<motion.div
						layoutId="activeIndicator"
						className="absolute left-0 top-1 bottom-1 w-0.5 bg-cyan-400 rounded-r-full"
					/>
				)}
				<Icon className={cn('w-5 h-5 transition-colors', active ? 'text-cyan-400' : 'text-white/70 group-hover:text-white')} strokeWidth={2} />
				<span className="text-sm font-medium">{item.name}</span>
			</motion.div>
		</Link>
	);
}

type NavSectionProps = {
	title?: string;
	items: NavigationItem[];
	baseIndex?: number;
	isAdmin: boolean;
	isActive: (href: string) => boolean;
	onNavClick?: () => void;
};

function NavSection({ title, items, baseIndex = 0, isAdmin, isActive, onNavClick }: NavSectionProps) {
	return (
		<div className="space-y-1">
			{title && (
				<div className="px-4 py-2">
					<span className="text-xs font-semibold text-white/40 uppercase tracking-wider">{title}</span>
				</div>
			)}
			{items
				.filter((item) => !item.adminOnly || isAdmin)
				.map((item, index) => (
					<NavItem key={item.name} item={item} index={baseIndex + index} isActive={isActive} onNavClick={onNavClick} />
				))}
		</div>
	);
}

function SidebarContent({
	pathname,
	session,
	onSignOut,
	onNavClick,
}: {
	pathname: string;
	session: Session | null;
	onSignOut: () => Promise<void>;
	onNavClick?: () => void;
}) {
	type AppUser = Session['user'] & { role?: string };
	const appUser = session?.user as AppUser | undefined;
	const isAdmin = appUser?.role === 'admin';

	const isActive = (href: string) => {
		if (href === '/dashboard') {
			return pathname === '/dashboard';
		}
		return pathname.startsWith(href);
	};

	return (
		<div className="flex flex-col h-full bg-[#0a1628]/95 backdrop-blur-md border-r border-cyan-500/20">
			{/* Logo/Header */}
			<div className="flex items-center gap-3 px-6 py-5 border-b border-cyan-500/10">
				<div className="relative w-9 h-9 rounded-lg bg-[#020817] border border-cyan-500/40 flex items-center justify-center">
					<div className="absolute inset-0 rounded-lg bg-cyan-500/10 blur-md" />
					<Package className="relative w-5 h-5 text-cyan-400" strokeWidth={2} />
				</div>
				<div>
					<h2 className="text-base font-bold text-white">Jacxi</h2>
					<p className="text-[10px] text-white/50 uppercase tracking-wider">Dashboard</p>
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
				{/* Main */}
				<NavSection items={mainNavigation} baseIndex={0} isAdmin={isAdmin} isActive={isActive} onNavClick={onNavClick} />

				{/* Shipments */}
				<NavSection title="Shipments" items={shipmentNavigation} baseIndex={1} isAdmin={isAdmin} isActive={isActive} onNavClick={onNavClick} />

				{/* Admin Section */}
				{isAdmin && (
					<NavSection title="Administration" items={adminNavigation} baseIndex={3} isAdmin={isAdmin} isActive={isActive} onNavClick={onNavClick} />
				)}

				{/* Other */}
				<NavSection items={otherNavigation} baseIndex={isAdmin ? 6 : 3} isAdmin={isAdmin} isActive={isActive} onNavClick={onNavClick} />

				{/* Settings */}
				<div className="pt-4">
					<div className="h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent mb-4" />
					<NavSection items={settingsNavigation} baseIndex={isAdmin ? 9 : 6} isAdmin={isAdmin} isActive={isActive} onNavClick={onNavClick} />
				</div>
			</nav>

			{/* User Section */}
			<div className="px-3 py-4 border-t border-cyan-500/10">
				<div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#020817]/50 border border-cyan-500/20 mb-2">
					<div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/20 to-cyan-400/20 border border-cyan-500/30 flex items-center justify-center flex-shrink-0">
						<User className="w-4 h-4 text-cyan-400" strokeWidth={2} />
					</div>
					<div className="flex-1 min-w-0">
						<p className="text-xs font-medium text-white truncate">{session?.user?.name || 'User'}</p>
						<p className="text-[10px] text-white/50 truncate">{session?.user?.email || ''}</p>
					</div>
				</div>

				<Button
					variant="ghost"
					onClick={onSignOut}
					className="w-full justify-start text-white/60 hover:text-white hover:bg-red-500/10 hover:border-red-500/20 border border-transparent text-xs py-2 h-auto"
				>
					<LogOut className="w-4 h-4 mr-2" strokeWidth={2} />
					Sign Out
				</Button>
			</div>
		</div>
	);
}
