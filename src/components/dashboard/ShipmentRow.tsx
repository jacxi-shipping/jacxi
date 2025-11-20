"use client";

import Link from 'next/link';
import { Visibility, Edit, ArrowForward, CreditCard } from '@mui/icons-material';
import { Card, CardContent, Box, Typography, Chip, Button, LinearProgress, Slide } from '@mui/material';
import { useState, useEffect } from 'react';

interface ShipmentRowProps {
	id: string;
	trackingNumber: string;
	vehicleType: string;
	vehicleMake: string | null;
	vehicleModel: string | null;
	origin: string;
	destination: string;
	status: string;
	progress: number;
	estimatedDelivery: string | null;
	createdAt: string;
	paymentStatus?: string;
	user?: {
		name: string | null;
		email: string;
	};
	showCustomer?: boolean;
	isAdmin?: boolean;
	onStatusUpdated?: () => void;
	delay?: number;
}

type StatusColors = {
	bg: string;
	text: string;
	border: string;
	glow: string;
};

const statusColors: Record<string, StatusColors> = {
	PENDING: { bg: 'rgba(107, 114, 128, 0.15)', text: 'rgb(156, 163, 175)', border: 'rgba(107, 114, 128, 0.4)', glow: 'rgba(107, 114, 128, 0.3)' },
	QUOTE_REQUESTED: { bg: 'rgba(59, 130, 246, 0.15)', text: 'rgb(96, 165, 250)', border: 'rgba(59, 130, 246, 0.4)', glow: 'rgba(59, 130, 246, 0.3)' },
	QUOTE_APPROVED: { bg: 'rgba(34, 197, 94, 0.15)', text: 'rgb(74, 222, 128)', border: 'rgba(34, 197, 94, 0.4)', glow: 'rgba(34, 197, 94, 0.3)' },
	PICKUP_SCHEDULED: { bg: 'rgba(234, 179, 8, 0.15)', text: 'rgb(250, 204, 21)', border: 'rgba(234, 179, 8, 0.4)', glow: 'rgba(234, 179, 8, 0.3)' },
	PICKUP_COMPLETED: { bg: 'rgba(249, 115, 22, 0.15)', text: 'rgb(251, 146, 60)', border: 'rgba(249, 115, 22, 0.4)', glow: 'rgba(249, 115, 22, 0.3)' },
	IN_TRANSIT: { bg: 'rgba(6, 182, 212, 0.15)', text: 'rgb(34, 211, 238)', border: 'rgba(6, 182, 212, 0.4)', glow: 'rgba(6, 182, 212, 0.3)' },
	AT_PORT: { bg: 'rgba(139, 92, 246, 0.15)', text: 'rgb(167, 139, 250)', border: 'rgba(139, 92, 246, 0.4)', glow: 'rgba(139, 92, 246, 0.3)' },
	LOADED_ON_VESSEL: { bg: 'rgba(99, 102, 241, 0.15)', text: 'rgb(129, 140, 248)', border: 'rgba(99, 102, 241, 0.4)', glow: 'rgba(99, 102, 241, 0.3)' },
	IN_TRANSIT_OCEAN: { bg: 'rgba(236, 72, 153, 0.15)', text: 'rgb(244, 114, 182)', border: 'rgba(236, 72, 153, 0.4)', glow: 'rgba(236, 72, 153, 0.3)' },
	ARRIVED_AT_DESTINATION: { bg: 'rgba(20, 184, 166, 0.15)', text: 'rgb(45, 212, 191)', border: 'rgba(20, 184, 166, 0.4)', glow: 'rgba(20, 184, 166, 0.3)' },
	CUSTOMS_CLEARANCE: { bg: 'rgba(6, 182, 212, 0.15)', text: 'rgb(34, 211, 238)', border: 'rgba(6, 182, 212, 0.4)', glow: 'rgba(6, 182, 212, 0.3)' },
	OUT_FOR_DELIVERY: { bg: 'rgba(132, 204, 22, 0.15)', text: 'rgb(163, 230, 53)', border: 'rgba(132, 204, 22, 0.4)', glow: 'rgba(132, 204, 22, 0.3)' },
	DELIVERED: { bg: 'rgba(16, 185, 129, 0.15)', text: 'rgb(52, 211, 153)', border: 'rgba(16, 185, 129, 0.4)', glow: 'rgba(16, 185, 129, 0.3)' },
	CANCELLED: { bg: 'rgba(239, 68, 68, 0.15)', text: 'rgb(248, 113, 113)', border: 'rgba(239, 68, 68, 0.4)', glow: 'rgba(239, 68, 68, 0.3)' },
	ON_HOLD: { bg: 'rgba(245, 158, 11, 0.15)', text: 'rgb(251, 191, 36)', border: 'rgba(245, 158, 11, 0.4)', glow: 'rgba(245, 158, 11, 0.3)' },
};

const formatStatus = (status: string) => {
	return status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
};

const paymentStatusColors: Record<string, StatusColors> = {
	PENDING: { bg: 'rgba(234, 179, 8, 0.15)', text: 'rgb(250, 204, 21)', border: 'rgba(234, 179, 8, 0.4)', glow: 'rgba(234, 179, 8, 0.3)' },
	COMPLETED: { bg: 'rgba(34, 197, 94, 0.15)', text: 'rgb(74, 222, 128)', border: 'rgba(34, 197, 94, 0.4)', glow: 'rgba(34, 197, 94, 0.3)' },
	FAILED: { bg: 'rgba(239, 68, 68, 0.15)', text: 'rgb(248, 113, 113)', border: 'rgba(239, 68, 68, 0.4)', glow: 'rgba(239, 68, 68, 0.3)' },
	REFUNDED: { bg: 'rgba(59, 130, 246, 0.15)', text: 'rgb(96, 165, 250)', border: 'rgba(59, 130, 246, 0.4)', glow: 'rgba(59, 130, 246, 0.3)' },
	CANCELLED: { bg: 'rgba(107, 114, 128, 0.15)', text: 'rgb(156, 163, 175)', border: 'rgba(107, 114, 128, 0.4)', glow: 'rgba(107, 114, 128, 0.3)' },
};

export default function ShipmentRow({
	id,
	trackingNumber,
	vehicleType,
	vehicleMake,
	vehicleModel,
	origin,
	destination,
	status,
	progress,
	estimatedDelivery,
	createdAt,
	paymentStatus,
	user,
	showCustomer = false,
	delay = 0,
}: ShipmentRowProps) {
	const statusConfig = statusColors[status] || statusColors.PENDING;
	const paymentConfig = paymentStatus ? (paymentStatusColors[paymentStatus] || paymentStatusColors.PENDING) : null;
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), delay * 1000);
		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<Slide in={isVisible} direction="up" timeout={600}>
			<Card
				sx={{
					background: 'rgba(5, 10, 22, 0.95)',
					backdropFilter: 'blur(16px)',
					border: '1px solid rgba(148, 163, 184, 0.18)',
					borderRadius: 3,
					p: { xs: 1.5, md: 2 },
					transition: 'border-color 0.2s ease, transform 0.2s ease',
					'&:hover': {
						borderColor: 'rgba(34, 211, 238, 0.5)',
						transform: 'translateY(-2px)',
					},
				}}
			>
				<CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.1fr) minmax(0, 0.9fr) minmax(0, 0.65fr) auto' },
							gap: { xs: 1.5, md: 2 },
							alignItems: 'center',
						}}
					>
						<Box sx={{ minWidth: 0 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
								<Typography
									sx={{
										fontSize: '1rem',
										fontWeight: 600,
										color: 'white',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}}
								>
									{trackingNumber}
								</Typography>
								<Chip
									label={formatStatus(status)}
									size="small"
									sx={{
										fontSize: '0.65rem',
										fontWeight: 600,
										height: 22,
										px: 0.75,
										bgcolor: statusConfig.bg,
										color: statusConfig.text,
										border: `1px solid ${statusConfig.border}`,
									}}
								/>
								{paymentStatus && paymentConfig && (
									<Chip
										icon={<CreditCard sx={{ fontSize: 14, color: paymentConfig.text }} />}
										label={formatStatus(paymentStatus)}
										size="small"
										sx={{
											fontSize: '0.65rem',
											fontWeight: 600,
											height: 22,
											px: 0.75,
											bgcolor: paymentConfig.bg,
											color: paymentConfig.text,
											border: `1px solid ${paymentConfig.border}`,
										}}
									/>
								)}
							</Box>
							<Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)' }}>
								Created {new Date(createdAt).toLocaleDateString()}
							</Typography>
						</Box>

						<Box sx={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'white', minWidth: 0 }}>
								<Typography
									component="span"
									sx={{
										fontSize: '0.85rem',
										fontWeight: 600,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}}
								>
									{origin}
								</Typography>
								<ArrowForward sx={{ fontSize: 16, color: 'rgb(34, 211, 238)' }} />
								<Typography
									component="span"
									sx={{
										fontSize: '0.85rem',
										fontWeight: 600,
										overflow: 'hidden',
										textOverflow: 'ellipsis',
										whiteSpace: 'nowrap',
									}}
								>
									{destination}
								</Typography>
							</Box>
							<Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)' }}>
								{vehicleType} {vehicleMake && vehicleModel ? `• ${vehicleMake} ${vehicleModel}` : ''}
							</Typography>
							{showCustomer && user && (
								<Typography sx={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.5)' }}>
									{user.name || 'N/A'} • {user.email}
								</Typography>
							)}
						</Box>

						<Box sx={{ minWidth: 0 }}>
							<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
								<Typography sx={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.45)' }}>
									Progress
								</Typography>
								<Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: statusConfig.text }}>{progress}%</Typography>
							</Box>
							<LinearProgress
								variant="determinate"
								value={progress}
								sx={{
									height: 6,
									borderRadius: 999,
									bgcolor: 'rgba(148,163,184,0.2)',
									'& .MuiLinearProgress-bar': {
										borderRadius: 999,
										background: `linear-gradient(90deg, ${statusConfig.text}, rgba(34,211,238,0.8))`,
									},
								}}
							/>
							<Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
								ETA {estimatedDelivery ? new Date(estimatedDelivery).toLocaleDateString() : 'TBD'}
							</Typography>
						</Box>

						<Box
							sx={{
								display: 'flex',
								flexDirection: { xs: 'row', sm: 'column' },
								gap: 0.75,
								justifySelf: 'stretch',
							}}
						>
							<Link href={`/dashboard/shipments/${id}`} style={{ textDecoration: 'none', flex: 1 }}>
								<Button
									variant="outlined"
									size="small"
									startIcon={<Visibility sx={{ fontSize: 16 }} />}
									sx={{
										width: '100%',
										fontSize: '0.75rem',
										borderRadius: 999,
										borderColor: 'rgba(34,211,238,0.4)',
										color: 'rgb(34,211,238)',
										textTransform: 'none',
										'&:hover': {
											borderColor: 'rgba(34,211,238,0.7)',
											bgcolor: 'rgba(34,211,238,0.08)',
										},
									}}
								>
									View
								</Button>
							</Link>
							<Link href={`/dashboard/shipments/${id}/edit`} style={{ textDecoration: 'none', flex: 1 }}>
								<Button
									variant="outlined"
									size="small"
									startIcon={<Edit sx={{ fontSize: 16 }} />}
									sx={{
										width: '100%',
										fontSize: '0.75rem',
										borderRadius: 999,
										borderColor: 'rgba(147,112,219,0.4)',
										color: 'rgb(196,181,253)',
										textTransform: 'none',
										'&:hover': {
											borderColor: 'rgba(147,112,219,0.7)',
											bgcolor: 'rgba(147,112,219,0.1)',
										},
									}}
								>
									Edit
								</Button>
							</Link>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Slide>
	);
}
