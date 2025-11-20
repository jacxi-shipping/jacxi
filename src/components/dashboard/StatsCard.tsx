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
		<Fade in={isVisible} timeout={800}>
			<Card
				sx={{
					height: '100%',
					background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.8) 0%, rgba(10, 22, 40, 0.4) 100%)',
					backdropFilter: 'blur(20px)',
					border: '1px solid rgba(6, 182, 212, 0.2)',
					borderRadius: { xs: 3, sm: 4 },
					p: { xs: 2, sm: 3, md: 4 },
					position: 'relative',
					overflow: 'hidden',
					transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
					transform: 'translateY(0) scale(1)',
					'&:hover': {
						borderColor: 'rgba(6, 182, 212, 0.6)',
						boxShadow: '0 20px 40px rgba(6, 182, 212, 0.3), 0 0 80px rgba(6, 182, 212, 0.1)',
						transform: 'translateY(-8px) scale(1.02)',
						'&::before': {
							opacity: 1,
							transform: 'translateX(0)',
						},
						'& .icon-container': {
							transform: 'scale(1.1) rotate(5deg)',
							boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)',
						},
						'& .value': {
							transform: 'scale(1.05)',
						},
					},
					'&::before': {
						content: '""',
						position: 'absolute',
						inset: 0,
						background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 50%, rgba(6, 182, 212, 0) 100%)',
						opacity: 0,
						transform: 'translateX(-100%)',
						transition: 'all 0.6s ease',
					},
					'&::after': {
						content: '""',
						position: 'absolute',
						top: 0,
						right: 0,
						width: '200px',
						height: '200px',
						background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%)',
						borderRadius: '50%',
						filter: 'blur(40px)',
						opacity: 0.3,
						pointerEvents: 'none',
					},
				}}
			>
				<CardContent sx={{ p: 0, '&:last-child': { pb: 0 }, position: 'relative', zIndex: 1 }}>
					{/* Icon and Trend */}
					<Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: { xs: 2, sm: 3 } }}>
						<Zoom in={isVisible} timeout={600} style={{ transitionDelay: `${delay * 1000 + 200}ms` }}>
							<Box
								className="icon-container"
								sx={{
									position: 'relative',
									width: { xs: 50, sm: 60, md: 70 },
									height: { xs: 50, sm: 60, md: 70 },
									borderRadius: { xs: 2.5, sm: 3 },
									background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(6, 182, 212, 0.05) 100%)',
									border: '1.5px solid rgba(6, 182, 212, 0.4)',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
									boxShadow: '0 0 20px rgba(6, 182, 212, 0.2), inset 0 0 20px rgba(6, 182, 212, 0.1)',
									'&::before': {
										content: '""',
										position: 'absolute',
										inset: -2,
										borderRadius: { xs: 2.5, sm: 3 },
										background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.4), rgba(6, 182, 212, 0.1))',
										filter: 'blur(10px)',
										opacity: 0.5,
										zIndex: -1,
									},
								}}
							>
								<Icon
									sx={{
										fontSize: { xs: 24, sm: 30, md: 36 },
										color: 'rgb(34, 211, 238)',
										position: 'relative',
										filter: 'drop-shadow(0 0 8px rgba(34, 211, 238, 0.5))',
										transition: 'all 0.3s ease',
									}}
								/>
							</Box>
						</Zoom>
						{trend && (
							<Fade in={isVisible} timeout={600} style={{ transitionDelay: `${delay * 1000 + 400}ms` }}>
								<Chip
									label={`${trend.isPositive ? '↑' : '↓'} ${Math.abs(trend.value)}%`}
									size="small"
									sx={{
										fontSize: { xs: '0.7rem', sm: '0.75rem' },
										fontWeight: 600,
										px: { xs: 1, sm: 1.5 },
										py: { xs: 0.5, sm: 0.75 },
										height: 'auto',
										background: trend.isPositive 
											? 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(34, 197, 94, 0.1) 100%)'
											: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.1) 100%)',
										color: trend.isPositive ? 'rgb(74, 222, 128)' : 'rgb(248, 113, 113)',
										border: `1px solid ${trend.isPositive ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
										boxShadow: trend.isPositive 
											? '0 0 15px rgba(34, 197, 94, 0.3)'
											: '0 0 15px rgba(239, 68, 68, 0.3)',
										transition: 'all 0.3s ease',
										'&:hover': {
											transform: 'scale(1.05)',
										},
									}}
								/>
							</Fade>
						)}
					</Box>

					{/* Value */}
					<Fade in={isVisible} timeout={800} style={{ transitionDelay: `${delay * 1000 + 300}ms` }}>
						<Typography
							className="value"
							variant="h3"
							sx={{
								fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' },
								fontWeight: 800,
								background: 'linear-gradient(135deg, rgb(255, 255, 255) 0%, rgb(200, 220, 255) 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text',
								mb: { xs: 0.75, sm: 1.5 },
								lineHeight: 1.2,
								letterSpacing: '-0.02em',
								transition: 'transform 0.3s ease',
							}}
						>
							{value}
						</Typography>
					</Fade>

					{/* Title */}
					<Fade in={isVisible} timeout={800} style={{ transitionDelay: `${delay * 1000 + 400}ms` }}>
						<Typography
							variant="body2"
							sx={{
								fontSize: { xs: '0.875rem', sm: '1rem', md: '1.125rem' },
								fontWeight: 600,
								color: 'rgba(255, 255, 255, 0.9)',
								mb: { xs: 0.5, sm: 0.75 },
								overflow: 'hidden',
								textOverflow: 'ellipsis',
								whiteSpace: 'nowrap',
								letterSpacing: '0.01em',
							}}
						>
							{title}
						</Typography>
					</Fade>

					{/* Subtitle */}
					{subtitle && (
						<Fade in={isVisible} timeout={800} style={{ transitionDelay: `${delay * 1000 + 500}ms` }}>
							<Typography
								variant="caption"
								sx={{
									fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.9rem' },
									color: 'rgba(255, 255, 255, 0.5)',
									overflow: 'hidden',
									textOverflow: 'ellipsis',
									whiteSpace: 'nowrap',
									display: 'block',
									fontWeight: 500,
								}}
							>
								{subtitle}
							</Typography>
						</Fade>
					)}
				</CardContent>
			</Card>
		</Fade>
	);
}
