"use client";

import Link from 'next/link';
import { Visibility, Edit, ArrowForward, CreditCard } from '@mui/icons-material';
import { Card, CardContent, Box, Typography, Chip, Button, LinearProgress, Slide } from '@mui/material';
import { ReactNode, useEffect, useState } from 'react';

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
	PENDING: { bg: 'rgba(107, 114, 128, 0.12)', text: 'rgb(156, 163, 175)', border: 'rgba(107, 114, 128, 0.35)', glow: 'rgba(107, 114, 128, 0.2)' },
	QUOTE_REQUESTED: { bg: 'rgba(59, 130, 246, 0.12)', text: 'rgb(96, 165, 250)', border: 'rgba(59, 130, 246, 0.35)', glow: 'rgba(59, 130, 246, 0.2)' },
	QUOTE_APPROVED: { bg: 'rgba(34, 197, 94, 0.12)', text: 'rgb(74, 222, 128)', border: 'rgba(34, 197, 94, 0.35)', glow: 'rgba(34, 197, 94, 0.2)' },
	PICKUP_SCHEDULED: { bg: 'rgba(234, 179, 8, 0.12)', text: 'rgb(250, 204, 21)', border: 'rgba(234, 179, 8, 0.35)', glow: 'rgba(234, 179, 8, 0.2)' },
	PICKUP_COMPLETED: { bg: 'rgba(249, 115, 22, 0.12)', text: 'rgb(251, 146, 60)', border: 'rgba(249, 115, 22, 0.35)', glow: 'rgba(249, 115, 22, 0.2)' },
	IN_TRANSIT: { bg: 'rgba(6, 182, 212, 0.12)', text: 'rgb(34, 211, 238)', border: 'rgba(6, 182, 212, 0.35)', glow: 'rgba(6, 182, 212, 0.2)' },
	AT_PORT: { bg: 'rgba(139, 92, 246, 0.12)', text: 'rgb(167, 139, 250)', border: 'rgba(139, 92, 246, 0.35)', glow: 'rgba(139, 92, 246, 0.2)' },
	LOADED_ON_VESSEL: { bg: 'rgba(99, 102, 241, 0.12)', text: 'rgb(129, 140, 248)', border: 'rgba(99, 102, 241, 0.35)', glow: 'rgba(99, 102, 241, 0.2)' },
	IN_TRANSIT_OCEAN: { bg: 'rgba(236, 72, 153, 0.12)', text: 'rgb(244, 114, 182)', border: 'rgba(236, 72, 153, 0.35)', glow: 'rgba(236, 72, 153, 0.2)' },
	ARRIVED_AT_DESTINATION: { bg: 'rgba(20, 184, 166, 0.12)', text: 'rgb(45, 212, 191)', border: 'rgba(20, 184, 166, 0.35)', glow: 'rgba(20, 184, 166, 0.2)' },
	CUSTOMS_CLEARANCE: { bg: 'rgba(6, 182, 212, 0.12)', text: 'rgb(34, 211, 238)', border: 'rgba(6, 182, 212, 0.35)', glow: 'rgba(6, 182, 212, 0.2)' },
	OUT_FOR_DELIVERY: { bg: 'rgba(132, 204, 22, 0.12)', text: 'rgb(163, 230, 53)', border: 'rgba(132, 204, 22, 0.35)', glow: 'rgba(132, 204, 22, 0.2)' },
	DELIVERED: { bg: 'rgba(16, 185, 129, 0.12)', text: 'rgb(52, 211, 153)', border: 'rgba(16, 185, 129, 0.35)', glow: 'rgba(16, 185, 129, 0.2)' },
	CANCELLED: { bg: 'rgba(239, 68, 68, 0.12)', text: 'rgb(248, 113, 113)', border: 'rgba(239, 68, 68, 0.35)', glow: 'rgba(239, 68, 68, 0.2)' },
	ON_HOLD: { bg: 'rgba(245, 158, 11, 0.12)', text: 'rgb(251, 191, 36)', border: 'rgba(245, 158, 11, 0.35)', glow: 'rgba(245, 158, 11, 0.2)' },
};

const formatStatus = (status: string) =>
	status.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());

const paymentStatusColors: Record<string, StatusColors> = {
	PENDING: { bg: 'rgba(234, 179, 8, 0.15)', text: 'rgb(250, 204, 21)', border: 'rgba(234, 179, 8, 0.4)', glow: 'rgba(234, 179, 8, 0.2)' },
	COMPLETED: { bg: 'rgba(34, 197, 94, 0.15)', text: 'rgb(74, 222, 128)', border: 'rgba(34, 197, 94, 0.4)', glow: 'rgba(34, 197, 94, 0.2)' },
	FAILED: { bg: 'rgba(239, 68, 68, 0.15)', text: 'rgb(248, 113, 113)', border: 'rgba(239, 68, 68, 0.4)', glow: 'rgba(239, 68, 68, 0.2)' },
	REFUNDED: { bg: 'rgba(59, 130, 246, 0.15)', text: 'rgb(96, 165, 250)', border: 'rgba(59, 130, 246, 0.4)', glow: 'rgba(59, 130, 246, 0.2)' },
	CANCELLED: { bg: 'rgba(107, 114, 128, 0.15)', text: 'rgb(156, 163, 175)', border: 'rgba(107, 114, 128, 0.4)', glow: 'rgba(107, 114, 128, 0.2)' },
};

type InfoColumnProps = {
	label: string;
	value: ReactNode;
	helper?: ReactNode;
};

function InfoColumn({ label, value, helper }: InfoColumnProps) {
	return (
		<Box sx={{ minWidth: 0 }}>
			<Typography
				variant="caption"
				sx={{
					fontSize: '0.65rem',
					textTransform: 'uppercase',
					letterSpacing: '0.08em',
					fontWeight: 600,
					color: 'rgba(255, 255, 255, 0.5)',
					mb: 0.35,
				}}
			>
				{label}
			</Typography>
			<Typography
				component="p"
				sx={{
					fontSize: '0.85rem',
					fontWeight: 600,
					color: 'white',
					overflow: 'hidden',
					textOverflow: 'ellipsis',
					whiteSpace: 'nowrap',
				}}
			>
				{value}
			</Typography>
			{helper && (
				<Typography
					sx={{
						fontSize: '0.72rem',
						color: 'rgba(255, 255, 255, 0.6)',
						mt: 0.2,
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						whiteSpace: 'nowrap',
					}}
				>
					{helper}
				</Typography>
			)}
		</Box>
	);
}

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
	isAdmin = false,
	delay = 0,
}: ShipmentRowProps) {
	const statusConfig = statusColors[status] || statusColors.PENDING;
	const paymentConfig = paymentStatus ? paymentStatusColors[paymentStatus] || paymentStatusColors.PENDING : null;
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), delay * 1000);
		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<Slide in={isVisible} direction="up" timeout={450}>
			<Card
				sx={{
					background: 'linear-gradient(135deg, rgba(8, 13, 22, 0.95) 0%, rgba(4, 7, 14, 0.88) 100%)',
					border: '1px solid rgba(148, 163, 184, 0.18)',
					borderRadius: 2,
					boxShadow: '0 16px 38px rgba(3, 6, 12, 0.55)',
					transition: 'transform 160ms ease, border-color 160ms ease',
					'&:hover': {
						transform: 'translateY(-2px)',
						borderColor: 'rgba(34, 211, 238, 0.36)',
					},
				}}
			>
				<CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', md: 'row' },
							alignItems: { xs: 'flex-start', md: 'center' },
							justifyContent: 'space-between',
							gap: 0.65,
						}}
					>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.55, flexWrap: 'wrap', minWidth: 0 }}>
							<Typography
								sx={{
									fontSize: '0.95rem',
									fontWeight: 600,
									color: 'white',
									letterSpacing: '-0.01em',
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
									fontSize: '0.68rem',
									fontWeight: 600,
									px: 0.75,
									py: 0.15,
									height: 'auto',
									color: statusConfig.text,
									backgroundColor: statusConfig.bg,
									border: `1px solid ${statusConfig.border}`,
								}}
							/>
							{paymentConfig && (
								<Chip
									icon={<CreditCard sx={{ fontSize: 12, color: paymentConfig.text }} />}
									label={formatStatus(paymentStatus!)}
									size="small"
									sx={{
										fontSize: '0.68rem',
										fontWeight: 600,
										px: 0.75,
										py: 0.15,
										height: 'auto',
										color: paymentConfig.text,
										backgroundColor: paymentConfig.bg,
										border: `1px solid ${paymentConfig.border}`,
									}}
								/>
							)}
						</Box>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								gap: 0.55,
								width: { xs: '100%', md: 'auto' },
							}}
						>
							<Link href={`/dashboard/shipments/${id}`} style={{ textDecoration: 'none' }}>
								<Button
									variant="outlined"
									size="small"
									startIcon={<Visibility sx={{ fontSize: 14 }} />}
									sx={{
										fontSize: '0.75rem',
										fontWeight: 600,
										px: 1.5,
										py: 0.45,
										width: { xs: '100%', md: 'auto' },
										borderColor: 'rgba(34, 211, 238, 0.45)',
										color: 'rgb(34, 211, 238)',
										background: 'rgba(34, 211, 238, 0.08)',
										textTransform: 'none',
									}}
								>
									View
								</Button>
							</Link>
							{isAdmin && (
								<Link href={`/dashboard/shipments/${id}/edit`} style={{ textDecoration: 'none' }}>
									<Button
										variant="outlined"
										size="small"
										startIcon={<Edit sx={{ fontSize: 14 }} />}
										sx={{
											fontSize: '0.75rem',
											fontWeight: 600,
											px: 1.5,
											py: 0.45,
											width: { xs: '100%', md: 'auto' },
											borderColor: 'rgba(167, 139, 250, 0.35)',
											color: 'rgb(167, 139, 250)',
											background: 'rgba(167, 139, 250, 0.08)',
											textTransform: 'none',
										}}
									>
										Edit
									</Button>
								</Link>
							)}
						</Box>
					</Box>

					<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, mt: 0.7 }}>
						<Typography sx={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)' }}>
							Created {new Date(createdAt).toLocaleDateString()}
						</Typography>
						{estimatedDelivery && (
							<Typography sx={{ fontSize: '0.72rem', color: 'rgba(255, 255, 255, 0.55)' }}>
								ETA {new Date(estimatedDelivery).toLocaleDateString()}
							</Typography>
						)}
					</Box>

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
							gap: 0.85,
							mt: 1,
						}}
					>
						<InfoColumn
							label="Vehicle"
							value={vehicleType}
							helper={vehicleMake && vehicleModel ? `${vehicleMake} ${vehicleModel}` : undefined}
						/>
						<Box sx={{ minWidth: 0 }}>
							<Typography
								sx={{
									fontSize: '0.65rem',
									textTransform: 'uppercase',
									letterSpacing: '0.08em',
									fontWeight: 600,
									color: 'rgba(255, 255, 255, 0.5)',
									mb: 0.35,
								}}
							>
								Route
							</Typography>
							<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, flexWrap: 'wrap', color: 'white' }}>
								<Typography sx={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
									{origin}
								</Typography>
								<ArrowForward sx={{ fontSize: 15, color: 'rgba(34, 211, 238, 0.9)' }} />
								<Typography sx={{ fontSize: '0.85rem', fontWeight: 600, maxWidth: '45%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
									{destination}
								</Typography>
							</Box>
						</Box>
						<InfoColumn
							label="Delivery"
							value={estimatedDelivery ? new Date(estimatedDelivery).toLocaleDateString() : 'To be determined'}
						/>
					</Box>

					{showCustomer && user && (
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
								gap: 0.85,
								mt: 1,
								pt: 1,
								borderTop: '1px solid rgba(148, 163, 184, 0.18)',
							}}
						>
							<InfoColumn label="Customer" value={user.name || 'N/A'} helper={user.email} />
						</Box>
					)}

					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', sm: 'minmax(0, 1fr) auto' },
							alignItems: 'center',
							gap: 0.65,
							mt: 1,
						}}
					>
						<LinearProgress
							variant="determinate"
							value={progress}
							sx={{
								height: 4,
								borderRadius: 999,
								bgcolor: 'rgba(34, 211, 238, 0.15)',
								'& .MuiLinearProgress-bar': {
									background: 'linear-gradient(90deg, rgba(34,211,238,1) 0%, rgba(6,182,212,1) 100%)',
									borderRadius: 999,
								},
							}}
						/>
						<Typography sx={{ fontSize: '0.74rem', fontWeight: 600, color: 'rgb(34, 211, 238)' }}>
							{progress}% complete
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</Slide>
	);
}
