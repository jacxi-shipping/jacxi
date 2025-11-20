'use client';

import { useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';
import { Box } from '@mui/material';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<ProtectedRoute>
			<Box
				sx={{
					minHeight: '100vh',
					bgcolor: '#020817',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
				}}
			>
				{/* Header */}
				<Header onMenuClick={() => setMobileOpen(!mobileOpen)} />

				{/* Content Area with Sidebar */}
				<Box
					sx={{
						display: 'flex',
						flexGrow: 1,
						overflow: 'hidden',
					}}
				>
					{/* Sidebar */}
					<Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

					{/* Main Content */}
					<Box
						component="main"
						sx={{
							flexGrow: 1,
							minWidth: 0,
							overflow: 'auto',
							height: 'calc(100vh - 48px)',
							position: 'relative',
							bgcolor: '#020715',
							'&::before': {
								content: '""',
								position: 'absolute',
								inset: 0,
								background:
									'radial-gradient(circle at 20% 20%, rgba(34,211,238,0.12), transparent 45%), radial-gradient(circle at 80% 0%, rgba(147,197,253,0.12), transparent 40%)',
							},
							'&::after': {
								content: '""',
								position: 'absolute',
								inset: 0,
								backgroundImage:
									'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
								backgroundSize: '120px 120px',
								opacity: 0.08,
							},
						}}
					>
						<Box
							sx={{
								position: 'relative',
								zIndex: 1,
								minHeight: '100%',
								display: 'flex',
								flexDirection: 'column',
								gap: 0,
							}}
						>
							{children}
						</Box>
					</Box>
				</Box>
			</Box>
		</ProtectedRoute>
	);
}

