"use client";

import Link from 'next/link';
import { Add, Search, Inventory2, Description } from '@mui/icons-material';
import { Box, Card, CardContent, Typography, SvgIcon, Fade, Zoom } from '@mui/material';
import { useState, useEffect } from 'react';
import type { SvgIconComponent } from '@mui/icons-material';

const actions = [
	{
		icon: Add,
		title: 'New Shipment',
		description: 'Create a new shipping request',
		href: '/dashboard/shipments/new',
		color: 'cyan',
		colorValues: {
			border: 'rgba(6, 182, 212, 0.4)',
			borderHover: 'rgba(6, 182, 212, 0.8)',
			text: 'rgb(34, 211, 238)',
			bgHover: 'rgba(6, 182, 212, 0.15)',
			glow: 'rgba(6, 182, 212, 0.3)',
		},
	},
	{
		icon: Search,
		title: 'Track Shipment',
		description: 'Track an existing shipment',
		href: '/dashboard/tracking',
		color: 'blue',
		colorValues: {
			border: 'rgba(59, 130, 246, 0.4)',
			borderHover: 'rgba(59, 130, 246, 0.8)',
			text: 'rgb(96, 165, 250)',
			bgHover: 'rgba(59, 130, 246, 0.15)',
			glow: 'rgba(59, 130, 246, 0.3)',
		},
	},
	{
		icon: Inventory2,
		title: 'All Shipments',
		description: 'View all your shipments',
		href: '/dashboard/shipments',
		color: 'purple',
		colorValues: {
			border: 'rgba(139, 92, 246, 0.4)',
			borderHover: 'rgba(139, 92, 246, 0.8)',
			text: 'rgb(167, 139, 250)',
			bgHover: 'rgba(139, 92, 246, 0.15)',
			glow: 'rgba(139, 92, 246, 0.3)',
		},
	},
	{
		icon: Description,
		title: 'Documents',
		description: 'Manage shipping documents',
		href: '/dashboard/documents',
		color: 'green',
		colorValues: {
			border: 'rgba(34, 197, 94, 0.4)',
			borderHover: 'rgba(34, 197, 94, 0.8)',
			text: 'rgb(74, 222, 128)',
			bgHover: 'rgba(34, 197, 94, 0.15)',
			glow: 'rgba(34, 197, 94, 0.3)',
		},
	},
];

export default function QuickActions() {
	const show = true;

	return (
		<Fade in={show} timeout={800}>
			<Box>
				<Box sx={{ mb: { xs: 2, sm: 2.5, md: 3 } }}>
					<Typography
						variant="h5"
						sx={{
							fontSize: { xs: '1.375rem', sm: '1.625rem', md: '2rem' },
							fontWeight: 800,
							background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(200, 220, 255) 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							mb: { xs: 0.75, sm: 1 },
							letterSpacing: '-0.02em',
						}}
					>
						Quick Actions
					</Typography>
					<Typography
						variant="body2"
						sx={{
							fontSize: { xs: '0.8125rem', sm: '0.9375rem', md: '1.0625rem' },
							color: 'rgba(255, 255, 255, 0.7)',
							fontWeight: 500,
						}}
					>
						Common tasks
					</Typography>
				</Box>

				<Box
					sx={{
						display: 'grid',
						gridTemplateColumns: { xs: 'repeat(2, 1fr)', lg: '1fr' },
						gap: { xs: 1.5, sm: 2, md: 2.5 },
					}}
				>
					{actions.map((action, index) => {
						const Icon = action.icon;
						const { border, borderHover, text, bgHover, glow } = action.colorValues;

						return (
							<ActionCard
								key={action.title}
								action={action}
								index={index}
								Icon={Icon}
								border={border}
								borderHover={borderHover}
								text={text}
								bgHover={bgHover}
								glow={glow}
							/>
						);
					})}
				</Box>
			</Box>
		</Fade>
	);
}

interface ActionCardProps {
	action: typeof actions[number];
	index: number;
	Icon: SvgIconComponent;
	border: string;
	borderHover: string;
	text: string;
	bgHover: string;
	glow: string;
}

function ActionCard({ action, index, Icon, border, borderHover, text, bgHover, glow }: ActionCardProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), index * 100);
		return () => clearTimeout(timer);
	}, [index]);

	return (
		<Link href={action.href} style={{ textDecoration: 'none' }}>
			<Zoom in={isVisible} timeout={600}>
				<Card
					sx={{
						position: 'relative',
						background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.8) 0%, rgba(10, 22, 40, 0.4) 100%)',
						backdropFilter: 'blur(20px)',
						border: `1px solid ${border}`,
						borderRadius: { xs: 2.5, sm: 3 },
						p: { xs: 2, sm: 2.5, md: 3 },
						height: { xs: '110px', sm: '130px', lg: 'auto' },
						minHeight: { lg: '150px' },
						cursor: 'pointer',
						transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
						overflow: 'hidden',
						transform: 'translateY(0) scale(1)',
						'&:hover': {
							borderColor: borderHover,
							background: bgHover,
							boxShadow: `0 20px 40px ${glow}, 0 0 60px ${glow}`,
							transform: 'translateY(-6px) scale(1.03)',
							'&::before': {
								opacity: 1,
							},
							'& .icon-box': {
								transform: 'scale(1.1) rotate(5deg)',
								boxShadow: `0 0 30px ${glow}`,
							},
							'& .icon': {
								transform: 'scale(1.1)',
							},
						},
						'&::before': {
							content: '""',
							position: 'absolute',
							inset: 0,
							background: `linear-gradient(135deg, ${border}00 0%, ${border} 50%, ${border}00 100%)`,
							opacity: 0,
							transition: 'opacity 0.4s ease',
						},
						'&::after': {
							content: '""',
							position: 'absolute',
							top: '-50%',
							right: '-50%',
							width: '150%',
							height: '150%',
							background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
							opacity: 0.1,
							pointerEvents: 'none',
						},
					}}
				>
					<CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column' }}>
						<Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
							<Box
								className="icon-box"
								sx={{
									position: 'relative',
									width: { xs: 40, sm: 48, md: 56 },
									height: { xs: 40, sm: 48, md: 56 },
									borderRadius: { xs: 2, sm: 2.5 },
									background: `linear-gradient(135deg, ${border} 0%, ${border}50 100%)`,
									border: `1px solid ${border}`,
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
									boxShadow: `0 0 15px ${glow}, inset 0 0 15px ${glow}50`,
									'&::before': {
										content: '""',
										position: 'absolute',
										inset: -2,
										borderRadius: { xs: 2, sm: 2.5 },
										background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
										filter: 'blur(10px)',
										opacity: 0.5,
										zIndex: -1,
									},
								}}
							>
								<SvgIcon
									component={Icon}
									className="icon"
									sx={{
										position: 'relative',
										fontSize: { xs: 20, sm: 24, md: 28 },
										color: text,
										filter: `drop-shadow(0 0 8px ${glow})`,
										transition: 'all 0.3s ease',
									}}
								/>
							</Box>
						</Box>
						<Box sx={{ flex: 1 }}>
							<Typography
								variant="h6"
								sx={{
									fontSize: { xs: '0.9375rem', sm: '1.0625rem', md: '1.1875rem' },
									fontWeight: 700,
									color: 'white',
									mb: { xs: 0.5, sm: 0.75 },
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									display: '-webkit-box',
									WebkitLineClamp: 1,
									WebkitBoxOrient: 'vertical',
									letterSpacing: '-0.01em',
								}}
							>
								{action.title}
							</Typography>
							<Typography
								variant="body2"
								sx={{
									fontSize: { xs: '0.6875rem', sm: '0.75rem', md: '0.875rem' },
									color: 'rgba(255, 255, 255, 0.7)',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									display: '-webkit-box',
									WebkitLineClamp: 2,
									WebkitBoxOrient: 'vertical',
									fontWeight: 500,
								}}
							>
								{action.description}
							</Typography>
						</Box>
					</CardContent>
				</Card>
			</Zoom>
		</Link>
	);
}
