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
	const contentPadding = { xs: 1.5, md: 2, lg: 2.5 };

	return (
		<ProtectedRoute>
			<Box
				sx={{
					minHeight: '100vh',
					bgcolor: '#020817',
					display: 'flex',
					flexDirection: 'column',
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
							height: 'calc(100vh - 48px)',
							bgcolor: 'transparent',
							display: 'flex',
							flexDirection: 'column',
							overflow: 'hidden',
						}}
					>
						<Box
							sx={{
								flex: 1,
								display: 'flex',
								flexDirection: 'column',
								gap: 1.5,
								px: contentPadding,
								py: 1.5,
								overflow: 'hidden',
							}}
						>
							<Box
								sx={{
									flex: 1,
									borderRadius: 3,
									border: '1px solid rgba(148, 163, 184, 0.12)',
									background: 'radial-gradient(circle at 20% 0%, rgba(6, 182, 212, 0.1), transparent 55%) #030918',
									boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
									position: 'relative',
									overflow: 'hidden',
								}}
							>
								<Box
									sx={{
										position: 'absolute',
										inset: 0,
										pointerEvents: 'none',
										background: 'linear-gradient(180deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0) 35%)',
										opacity: 0.6,
									}}
								/>
								<Box
									sx={{
										position: 'relative',
										height: '100%',
										width: '100%',
										overflowY: 'auto',
										scrollbarWidth: 'none',
										px: { xs: 0.5, sm: 1 },
										py: { xs: 1, sm: 1.5 },
										'&::-webkit-scrollbar': {
											display: 'none',
										},
									}}
								>
									{children}
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Box>
		</ProtectedRoute>
	);
}

