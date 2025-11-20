"use client";

import Link from 'next/link';
import { Visibility, ArrowForward } from '@mui/icons-material';
import { Card, CardContent, Box, Typography, Chip, LinearProgress, Button, Fade, Slide } from '@mui/material';
import { useState, useEffect } from 'react';

type ShipmentCardProps = {
	id: string;
	trackingNumber: string;
	status: string;
	origin: string;
	destination: string;
	progress: number;
	estimatedDelivery: string | null;
	delay?: number;
};

type StatusColors = {
	bg: string;
	text: string;
	border: string;
	glow: string;
};

const statusColors: Record<string, StatusColors> = {
	'IN_TRANSIT': { bg: 'rgba(59, 130, 246, 0.15)', text: 'rgb(96, 165, 250)', border: 'rgba(59, 130, 246, 0.4)', glow: 'rgba(59, 130, 246, 0.3)' },
	'IN_TRANSIT_OCEAN': { bg: 'rgba(59, 130, 246, 0.15)', text: 'rgb(96, 165, 250)', border: 'rgba(59, 130, 246, 0.4)', glow: 'rgba(59, 130, 246, 0.3)' },
	'AT_PORT': { bg: 'rgba(139, 92, 246, 0.15)', text: 'rgb(167, 139, 250)', border: 'rgba(139, 92, 246, 0.4)', glow: 'rgba(139, 92, 246, 0.3)' },
	'DELIVERED': { bg: 'rgba(34, 197, 94, 0.15)', text: 'rgb(74, 222, 128)', border: 'rgba(34, 197, 94, 0.4)', glow: 'rgba(34, 197, 94, 0.3)' },
	'PICKUP_SCHEDULED': { bg: 'rgba(245, 158, 11, 0.15)', text: 'rgb(251, 191, 36)', border: 'rgba(245, 158, 11, 0.4)', glow: 'rgba(245, 158, 11, 0.3)' },
	'PICKUP_COMPLETED': { bg: 'rgba(245, 158, 11, 0.15)', text: 'rgb(251, 191, 36)', border: 'rgba(245, 158, 11, 0.4)', glow: 'rgba(245, 158, 11, 0.3)' },
	'PENDING': { bg: 'rgba(245, 158, 11, 0.15)', text: 'rgb(251, 191, 36)', border: 'rgba(245, 158, 11, 0.4)', glow: 'rgba(245, 158, 11, 0.3)' },
	'QUOTE_REQUESTED': { bg: 'rgba(245, 158, 11, 0.15)', text: 'rgb(251, 191, 36)', border: 'rgba(245, 158, 11, 0.4)', glow: 'rgba(245, 158, 11, 0.3)' },
	'QUOTE_APPROVED': { bg: 'rgba(245, 158, 11, 0.15)', text: 'rgb(251, 191, 36)', border: 'rgba(245, 158, 11, 0.4)', glow: 'rgba(245, 158, 11, 0.3)' },
	'LOADED_ON_VESSEL': { bg: 'rgba(59, 130, 246, 0.15)', text: 'rgb(96, 165, 250)', border: 'rgba(59, 130, 246, 0.4)', glow: 'rgba(59, 130, 246, 0.3)' },
	'ARRIVED_AT_DESTINATION': { bg: 'rgba(139, 92, 246, 0.15)', text: 'rgb(167, 139, 250)', border: 'rgba(139, 92, 246, 0.4)', glow: 'rgba(139, 92, 246, 0.3)' },
	'CUSTOMS_CLEARANCE': { bg: 'rgba(139, 92, 246, 0.15)', text: 'rgb(167, 139, 250)', border: 'rgba(139, 92, 246, 0.4)', glow: 'rgba(139, 92, 246, 0.3)' },
	'OUT_FOR_DELIVERY': { bg: 'rgba(6, 182, 212, 0.15)', text: 'rgb(34, 211, 238)', border: 'rgba(6, 182, 212, 0.4)', glow: 'rgba(6, 182, 212, 0.3)' },
	'DELAYED': { bg: 'rgba(239, 68, 68, 0.15)', text: 'rgb(248, 113, 113)', border: 'rgba(239, 68, 68, 0.4)', glow: 'rgba(239, 68, 68, 0.3)' },
	'CANCELLED': { bg: 'rgba(239, 68, 68, 0.15)', text: 'rgb(248, 113, 113)', border: 'rgba(239, 68, 68, 0.4)', glow: 'rgba(239, 68, 68, 0.3)' },
};

const defaultColors: StatusColors = { 
	bg: 'rgba(245, 158, 11, 0.15)', 
	text: 'rgb(251, 191, 36)', 
	border: 'rgba(245, 158, 11, 0.4)',
	glow: 'rgba(245, 158, 11, 0.3)'
};

export default function ShipmentCard({
	id,
	trackingNumber,
	status,
	origin,
	destination,
	progress,
	estimatedDelivery,
	delay = 0,
}: ShipmentCardProps) {
	const colors = statusColors[status] || defaultColors;
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), delay * 1000);
		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<Slide in={isVisible} direction="up" timeout={400}>
			<Card
				sx={{
					background: 'rgba(5, 11, 24, 0.92)',
					backdropFilter: 'blur(18px)',
					border: '1px solid rgba(148, 163, 184, 0.2)',
					borderRadius: 3,
					p: { xs: 1.5, sm: 2 },
					transition: 'border-color 0.2s ease, transform 0.2s ease',
					'&:hover': {
						borderColor: 'rgba(34, 211, 238, 0.5)',
						transform: 'translateY(-2px)',
					},
				}}
			>
				<CardContent
					sx={{
						p: 0,
						'&:last-child': { pb: 0 },
					}}
				>
					<Box
						sx={{
							display: 'grid',
							gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1.5fr) minmax(180px, 0.6fr)' },
							gap: { xs: 1.5, md: 2 },
							alignItems: 'stretch',
						}}
					>
						<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
							<Box
								sx={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'space-between',
									gap: 1,
									flexWrap: 'wrap',
								}}
							>
								<Box sx={{ minWidth: 0 }}>
									<Typography
										sx={{
											fontSize: '0.95rem',
											fontWeight: 600,
											color: 'white',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
										}}
									>
										{trackingNumber}
									</Typography>
									<Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)' }}>ID {id.slice(0, 8)}</Typography>
								</Box>
								<Chip
									label={status.replace(/_/g, ' ')}
									size="small"
									sx={{
										fontSize: '0.65rem',
										fontWeight: 600,
										height: 22,
										px: 1,
										borderRadius: 999,
										bgcolor: colors.bg,
										color: colors.text,
										border: `1px solid ${colors.border}`,
									}}
								/>
							</Box>

							<Box
								sx={{
									display: 'grid',
									gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
									gap: 1,
								}}
							>
								<RouteItem label="From" value={origin} />
								<RouteItem label="To" value={destination} />
							</Box>

							<Box
								sx={{
									display: 'grid',
									gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' },
									gap: 1,
								}}
							>
								<InfoItem label="Vehicle" value={vehicleType} secondary={[vehicleMake, vehicleModel].filter(Boolean).join(' ')} />
								<InfoItem label="ETA" value={estimatedDelivery ? new Date(estimatedDelivery).toLocaleDateString() : 'TBD'} />
							</Box>
						</Box>

						<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 1.5 }}>
							<Box>
								<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.75 }}>
									<Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>
										Progress
									</Typography>
									<Typography sx={{ fontSize: '0.75rem', fontWeight: 600, color: colors.text }}>{progress}%</Typography>
								</Box>
								<LinearProgress
									variant="determinate"
									value={progress}
									sx={{
										height: 6,
										borderRadius: 999,
										bgcolor: 'rgba(148, 163, 184, 0.15)',
										'& .MuiLinearProgress-bar': {
											borderRadius: 999,
											background: `linear-gradient(90deg, ${colors.text}, rgba(34,211,238,0.9))`,
										},
									}}
								/>
							</Box>

							<Link href={`/dashboard/tracking/${id}`} passHref style={{ textDecoration: 'none' }}>
								<Button
									fullWidth
									variant="outlined"
									endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
									sx={{
										fontSize: '0.8rem',
										textTransform: 'none',
										borderRadius: 999,
										borderColor: 'rgba(34, 211, 238, 0.4)',
										color: 'rgb(34, 211, 238)',
										'&:hover': {
											borderColor: 'rgba(34, 211, 238, 0.7)',
											bgcolor: 'rgba(34, 211, 238, 0.08)',
										},
									}}
								>
									Open timeline
								</Button>
							</Link>
						</Box>
					</Box>
				</CardContent>
			</Card>
		</Slide>
	);
}

function InfoItem({ label, value, secondary }: { label: string; value: string; secondary?: string }) {
	return (
		<Box sx={{ minWidth: 0 }}>
			<Typography sx={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)', mb: 0.5 }}>
				{label}
			</Typography>
			<Typography
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
			{secondary && (
				<Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
					{secondary}
				</Typography>
			)}
		</Box>
	);
}

function RouteItem({ label, value }: { label: string; value: string }) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 0.5,
			}}
		>
			<Typography sx={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.45)' }}>
				{label}
			</Typography>
			<Typography
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
		</Box>
	);
}
