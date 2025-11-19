'use client';

import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/dashboard/Sidebar';
import { Box } from '@mui/material';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ProtectedRoute>
			<Box
				sx={{
					minHeight: '100vh',
					bgcolor: '#020817',
					display: 'flex',
				}}
			>
				{/* Sidebar */}
				<Sidebar />

				{/* Main Content */}
				<Box
					component="main"
					sx={{
						flexGrow: 1,
						minWidth: 0,
						overflow: 'auto',
					}}
				>
					{children}
				</Box>
			</Box>
		</ProtectedRoute>
	);
}

