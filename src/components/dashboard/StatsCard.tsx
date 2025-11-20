"use client";

import { SvgIconComponent } from '@mui/icons-material';
import { Card, CardContent, Box, Typography, Chip, Fade, Zoom } from '@mui/material';
import { useState, useEffect } from 'react';

type StatsCardProps = {
	icon: SvgIconComponent;
	title: string;
	value: string | number;
	subtitle?: string;
	trend?: {
		value: number;
		isPositive: boolean;
	};
	delay?: number;
};

export default function StatsCard({ 
	icon: Icon, 
	title, 
	value, 
	subtitle, 
	trend,
	delay = 0
}: StatsCardProps) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setIsVisible(true), delay * 1000);
		return () => clearTimeout(timer);
	}, [delay]);

	return (
		<Fade in={isVisible} timeout={600}>
			<Card
				sx={{
					height: '100%',
					background: 'rgba(4, 9, 20, 0.85)',
					backdropFilter: 'blur(18px)',
					border: '1px solid rgba(148, 163, 184, 0.18)',
					borderRadius: 3,
					p: { xs: 1.5, sm: 2 },
					display: 'flex',
					flexDirection: 'column',
					gap: 1,
					boxShadow: '0 20px 45px rgba(2, 6, 23, 0.45)',
					transition: 'border-color 0.2s ease, transform 0.2s ease',
					'&:hover': {
						borderColor: 'rgba(34, 211, 238, 0.6)',
						transform: 'translateY(-2px)',
					},
				}}
			>
				<CardContent
					sx={{
						p: 0,
						'&:last-child': { pb: 0 },
						display: 'flex',
						flexDirection: 'column',
						gap: 1,
					}}
				>
					<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
						<Zoom in={isVisible} timeout={400}>
							<Box
								className="icon-container"
								sx={{
									width: 34,
									height: 34,
									borderRadius: 2,
									background: 'rgba(34, 211, 238, 0.1)',
									border: '1px solid rgba(34, 211, 238, 0.25)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<Icon sx={{ fontSize: 18, color: 'rgb(34, 211, 238)' }} />
							</Box>
						</Zoom>
						{trend && (
							<Chip
								label={`${trend.isPositive ? '▲' : '▼'} ${Math.abs(trend.value)}%`}
								size="small"
								sx={{
									fontSize: '0.65rem',
									fontWeight: 600,
									height: 22,
									borderRadius: 999,
									px: 0.75,
									bgcolor: trend.isPositive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
									color: trend.isPositive ? 'rgb(74, 222, 128)' : 'rgb(248, 113, 113)',
									border: `1px solid ${
										trend.isPositive ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'
									}`,
								}}
							/>
						)}
					</Box>

					<Typography
						variant="h3"
						sx={{
							fontSize: '1.375rem',
							fontWeight: 700,
							color: 'white',
							lineHeight: 1.1,
						}}
					>
						{value}
					</Typography>

					<Typography
						variant="body2"
						sx={{
							fontSize: '0.75rem',
							letterSpacing: '0.08em',
							textTransform: 'uppercase',
							fontWeight: 600,
							color: 'rgba(255, 255, 255, 0.65)',
						}}
					>
						{title}
					</Typography>

					{subtitle && (
						<Typography
							variant="caption"
							sx={{
								fontSize: '0.6875rem',
								color: 'rgba(255, 255, 255, 0.55)',
							}}
						>
							{subtitle}
						</Typography>
					)}
				</CardContent>
			</Card>
		</Fade>
	);
}
