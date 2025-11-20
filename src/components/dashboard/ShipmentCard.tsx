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
		<Slide in={isVisible} direction="up" timeout={600}>
			<Card
				sx={{
					background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.9) 0%, rgba(10, 22, 40, 0.6) 100%)',
					backdropFilter: 'blur(20px)',
					border: '1px solid rgba(6, 182, 212, 0.2)',
					borderRadius: { xs: 3, sm: 4 },
					p: { xs: 2.5, sm: 3.5, md: 4 },
					position: 'relative',
					overflow: 'hidden',
					transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
					transform: 'translateY(0) scale(1)',
					'&:hover': {
						borderColor: 'rgba(6, 182, 212, 0.5)',
						boxShadow: '0 20px 40px rgba(6, 182, 212, 0.25), 0 0 60px rgba(6, 182, 212, 0.1)',
						transform: 'translateY(-4px) scale(1.01)',
						'&::before': {
							opacity: 1,
						},
						'& .progress-bar': {
							transform: 'scaleY(1.2)',
						},
						'& .view-button': {
							transform: 'translateX(4px)',
							boxShadow: '0 0 20px rgba(6, 182, 212, 0.4)',
						},
					},
					'&::before': {
						content: '""',
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(6, 182, 212, 0) 100%)',
						opacity: 0,
						transition: 'opacity 0.4s ease',
					},
					'&::after': {
						content: '""',
						position: 'absolute',
						top: '-50%',
						right: '-50%',
						width: '200%',
						height: '200%',
						background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)',
						opacity: 0.5,
						pointerEvents: 'none',
					},
				}}
			>
				<CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, position: 'relative', zIndex: 1 }}>
					<Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, sm: 2.5 } }}>
						{/* Header */}
						<Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: { xs: 1.5, sm: 2 } }}>
							<Box sx={{ flex: 1, minWidth: 0 }}>
								<Fade in={isVisible} timeout={600} style={{ transitionDelay: '100ms' }}>
									<Typography
										variant="h6"
										sx={{
											fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.375rem' },
											fontWeight: 700,
											background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(200, 220, 255) 100%)',
											WebkitBackgroundClip: 'text',
											WebkitTextFillColor: 'transparent',
											backgroundClip: 'text',
											mb: { xs: 0.5, sm: 0.75 },
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											letterSpacing: '-0.01em',
										}}
									>
										{trackingNumber}
									</Typography>
								</Fade>
								<Fade in={isVisible} timeout={600} style={{ transitionDelay: '200ms' }}>
									<Typography
										variant="body2"
										sx={{
											fontSize: { xs: '0.8125rem', sm: '0.9375rem', md: '1rem' },
											color: 'rgba(255, 255, 255, 0.7)',
											overflow: 'hidden',
											textOverflow: 'ellipsis',
											whiteSpace: 'nowrap',
											fontWeight: 500,
											display: 'flex',
											alignItems: 'center',
											gap: 1,
										}}
									>
										<Box
											component="span"
											sx={{
												display: 'inline-block',
												width: 6,
												height: 6,
												borderRadius: '50%',
												bgcolor: colors.text,
												boxShadow: `0 0 10px ${colors.glow}`,
											}}
										/>
										{origin} → {destination}
									</Typography>
								</Fade>
							</Box>
							<Fade in={isVisible} timeout={600} style={{ transitionDelay: '300ms' }}>
								<Chip
									label={status.replace(/_/g, ' ')}
									size="small"
									sx={{
										fontSize: { xs: '0.6875rem', sm: '0.75rem' },
										fontWeight: 600,
										height: 'auto',
										py: 0.75,
										px: 1.5,
										background: colors.bg,
										color: colors.text,
										border: `1px solid ${colors.border}`,
										boxShadow: `0 0 15px ${colors.glow}`,
										flexShrink: 0,
										transition: 'all 0.3s ease',
										'&:hover': {
											transform: 'scale(1.05)',
											boxShadow: `0 0 25px ${colors.glow}`,
										},
									}}
								/>
							</Fade>
						</Box>

						{/* Progress */}
						<Fade in={isVisible} timeout={600} style={{ transitionDelay: '400ms' }}>
							<Box sx={{ mt: { xs: 0.5, sm: 1 } }}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
									<Typography
										variant="caption"
										sx={{
											fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.8125rem' },
											color: 'rgba(255, 255, 255, 0.6)',
											fontWeight: 600,
											textTransform: 'uppercase',
											letterSpacing: '0.05em',
										}}
									>
										Progress
									</Typography>
									<Typography
										variant="caption"
										sx={{
											fontSize: { xs: '0.75rem', sm: '0.8125rem', md: '0.875rem' },
											color: 'rgb(34, 211, 238)',
											fontWeight: 700,
											textShadow: '0 0 10px rgba(34, 211, 238, 0.5)',
										}}
									>
										{progress}%
									</Typography>
								</Box>
								<Box sx={{ position: 'relative' }}>
									<LinearProgress
										className="progress-bar"
										variant="determinate"
										value={progress}
										sx={{
											height: { xs: 8, sm: 10 },
											borderRadius: 2,
											bgcolor: 'rgba(6, 182, 212, 0.1)',
											transition: 'transform 0.3s ease',
											overflow: 'visible',
											'& .MuiLinearProgress-bar': {
												background: 'linear-gradient(90deg, rgb(34, 211, 238) 0%, rgb(6, 182, 212) 100%)',
												borderRadius: 2,
												boxShadow: '0 0 15px rgba(34, 211, 238, 0.5), inset 0 -2px 4px rgba(0, 0, 0, 0.3)',
												position: 'relative',
												'&::after': {
													content: '""',
													position: 'absolute',
													inset: 0,
													background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3), transparent)',
													borderRadius: 2,
												},
											},
										}}
									/>
								</Box>
							</Box>
						</Fade>

						{/* Footer */}
						<Fade in={isVisible} timeout={600} style={{ transitionDelay: '500ms' }}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: { xs: 'column', sm: 'row' },
									alignItems: { xs: 'flex-start', sm: 'center' },
									justifyContent: 'space-between',
									gap: { xs: 1.5, sm: 2 },
									pt: { xs: 2, sm: 2.5 },
									borderTop: '1px solid rgba(255, 255, 255, 0.08)',
								}}
							>
								<Typography
									variant="caption"
									sx={{
										fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.8125rem' },
										color: 'rgba(255, 255, 255, 0.6)',
										fontWeight: 500,
										display: 'flex',
										alignItems: 'center',
										gap: 0.75,
									}}
								>
									<Box
										component="span"
										sx={{
											display: 'inline-block',
											width: 4,
											height: 4,
											borderRadius: '50%',
											bgcolor: 'rgba(255, 255, 255, 0.4)',
										}}
									/>
									{estimatedDelivery ? (
										<>ETA: {new Date(estimatedDelivery).toLocaleDateString()}</>
									) : (
										<>ETA: TBD</>
									)}
								</Typography>
								<Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
									<Link href={`/dashboard/shipments/${id}`} style={{ textDecoration: 'none' }}>
										<Button
											className="view-button"
											variant="outlined"
											size="small"
											endIcon={<ArrowForward sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }} />}
											startIcon={<Visibility sx={{ fontSize: { xs: '1rem', sm: '1.125rem' } }} />}
											sx={{
												fontSize: { xs: '0.75rem', sm: '0.875rem' },
												fontWeight: 600,
												borderColor: 'rgba(6, 182, 212, 0.4)',
												background: 'rgba(6, 182, 212, 0.05)',
												color: 'rgb(34, 211, 238)',
												width: { xs: '100%', sm: 'auto' },
												px: { xs: 2, sm: 2.5 },
												py: { xs: 1, sm: 1.25 },
												transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
												'&:hover': {
													background: 'rgba(6, 182, 212, 0.15)',
													borderColor: 'rgba(6, 182, 212, 0.6)',
												},
												'& .MuiButton-endIcon': {
													transition: 'transform 0.3s ease',
												},
												'&:hover .MuiButton-endIcon': {
													transform: 'translateX(4px)',
												},
											}}
										>
											<Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
												View Details
											</Box>
											<Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
												Details
											</Box>
										</Button>
									</Link>
								</Box>
							</Box>
						</Fade>
					</Box>
				</CardContent>
			</Card>
		</Slide>
	);
}
