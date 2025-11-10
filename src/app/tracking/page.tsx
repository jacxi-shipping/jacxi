"use client";

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Section from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Search, MapPin, Clock, CheckCircle2, Phone, Mail, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrackingEventEntry {
	id: string;
	status: string;
	statusCode?: string;
	location?: string;
	terminal?: string;
	timestamp?: string;
	actual: boolean;
	description?: string;
}

interface TrackingDetails {
	containerNumber: string;
	shipmentStatus?: string;
	currentLocation?: string;
	estimatedArrival?: string;
	estimatedDeparture?: string;
	progress?: number | null;
	company?: {
		name?: string;
		url?: string | null;
		scacs?: string[];
	};
	origin?: string;
	destination?: string;
	containerType?: string;
	events: TrackingEventEntry[];
}

export default function TrackingPage() {
	const { t } = useTranslation();
	const [trackingNumber, setTrackingNumber] = useState('');
	const [trackingData, setTrackingData] = useState<TrackingDetails | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const formatDisplayDate = (value?: string) => {
		if (!value) return null;
		const date = new Date(value);
		if (Number.isNaN(date.getTime())) return null;
		return date.toLocaleString(undefined, {
			dateStyle: 'medium',
			timeStyle: 'short',
		});
	};

	const handleTrack = async () => {
		if (!trackingNumber.trim()) return;

		setIsLoading(true);
		setErrorMessage(null);
		setTrackingData(null);

		try {
			const response = await fetch('/api/tracking', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ trackNumber: trackingNumber.trim(), needRoute: true }),
			});

			const payload = await response.json();

			if (!response.ok) {
				setErrorMessage(payload?.message || 'Unable to retrieve tracking information.');
				return;
			}

			const details: TrackingDetails | undefined = payload?.tracking;
			if (!details) {
				setErrorMessage('No tracking data returned for this number.');
				return;
			}

			setTrackingData(details);
		} catch (error) {
			console.error('Error fetching tracking details:', error);
			const message = error instanceof Error ? error.message : 'Failed to fetch tracking information.';
			setErrorMessage(message);
		} finally {
			setIsLoading(false);
		}
	};

	const timelineEvents = (trackingData?.events || []).map((event) => ({
		...event,
		icon: event.actual ? CheckCircle2 : Clock,
		completed: event.actual,
		timestamp: formatDisplayDate(event.timestamp) || event.timestamp || 'Pending update',
	}));

	return (
		<div className="min-h-screen bg-[#020817]">
			{/* Hero Section */}
			<section className="relative min-h-[60vh] overflow-hidden bg-[#020817] text-white">
				{/* Subtle geometric grid pattern background */}
				<div className="absolute inset-0 opacity-[0.03]">
					<svg className="w-full h-full" preserveAspectRatio="none">
						<defs>
							<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
								<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
							</pattern>
						</defs>
						<rect width="100%" height="100%" fill="url(#grid)" className="text-cyan-400" />
					</svg>
				</div>

				{/* Subtle blue gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-[#020817] via-[#0a1628] to-[#020817]" />

				{/* Main content */}
				<div className="relative z-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center max-w-4xl mx-auto space-y-6"
					>
						<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white">
							{t('tracking.title')}
						</h1>
						<p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed">
							{t('tracking.subtitle')}
						</p>
					</motion.div>
				</div>
			</section>

			{/* Tracking Form */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="max-w-4xl mx-auto"
				>
					<div className={cn(
						'relative rounded-2xl bg-[#0a1628]/50 backdrop-blur-sm',
						'border border-cyan-500/30',
						'shadow-lg shadow-cyan-500/10',
						'p-8 sm:p-10 md:p-12'
					)}>
						{/* Glowing border effect */}
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-50" />

						<div className="relative z-10">
							<h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 text-center">
								Track Your Shipment
							</h2>
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="flex-1">
									<input
										type="text"
										placeholder="Enter tracking number"
										value={trackingNumber}
										onChange={(e) => setTrackingNumber(e.target.value)}
										onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
										className={cn(
											'w-full h-12 sm:h-14 px-4 sm:px-6 rounded-lg',
											'bg-[#020817]/50 border border-cyan-500/30',
											'text-white placeholder:text-white/50',
											'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50',
											'transition-all duration-300',
											'text-base sm:text-lg'
										)}
									/>
								</div>
								<Button
									onClick={handleTrack}
									disabled={isLoading || !trackingNumber.trim()}
									size="lg"
									className={cn(
										'group relative overflow-hidden',
										'bg-[#00bfff] text-white hover:bg-[#00a8e6]',
										'shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50',
										'px-8 py-6 text-base sm:text-lg font-semibold',
										'transition-all duration-300',
										'flex items-center gap-2',
										'disabled:opacity-50 disabled:cursor-not-allowed'
									)}
								>
									{isLoading ? (
										<>
											<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
											<span>Tracking...</span>
										</>
									) : (
										<>
											<Search className="w-5 h-5" />
											<span>{t('tracking.trackButton')}</span>
										</>
									)}
								</Button>
							</div>

							{errorMessage && (
								<div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-400">
									<AlertCircle className="w-4 h-4" />
									<span>{errorMessage}</span>
								</div>
							)}
						</div>
					</div>
				</motion.div>
			</Section>

			{/* Tracking Results */}
			{trackingData && (
				<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
					{/* Status Overview */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						className="mb-8"
					>
						<div className={cn(
							'relative rounded-2xl bg-[#0a1628]/50 backdrop-blur-sm',
							'border border-cyan-500/30',
							'shadow-lg shadow-cyan-500/10',
							'p-6 sm:p-8'
						)}>
							{/* Glowing border effect */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-50" />

							<div className="relative z-10">
								<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
									<div className="text-center">
										<div className="text-lg sm:text-xl font-bold text-cyan-400 mb-2 break-all">
											{trackingData.containerNumber}
										</div>
										<div className="text-sm text-white/70">{t('tracking.trackingNumber')}</div>
										{trackingData.company?.name && (
											<div className="text-xs text-white/60 mt-1">Carrier: {trackingData.company.name}</div>
										)}
									</div>
									<div className="text-center">
										<div className={cn(
											'inline-flex px-4 py-2 rounded-full text-sm font-medium mb-2',
											'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
										)}>
											{trackingData.shipmentStatus}
										</div>
										<div className="text-sm text-white/70">{t('tracking.status')}</div>
									</div>
									<div className="text-center">
										<div className="text-base sm:text-lg font-semibold text-white mb-1">
											{trackingData.currentLocation}
										</div>
										<div className="text-sm text-white/70">{t('tracking.location')}</div>
									</div>
									<div className="text-center">
										<div className="text-base sm:text-lg font-semibold text-white mb-1">
											{trackingData.estimatedArrival ? formatDisplayDate(trackingData.estimatedArrival) : 'N/A'}
										</div>
										<div className="text-sm text-white/70">{t('tracking.estimatedDelivery')}</div>
									</div>
								</div>
								
								{/* Progress Bar */}
								{(() => {
									const progressValue = typeof trackingData.progress === 'number'
										? Math.min(100, Math.max(0, trackingData.progress))
										: 0;
									return (
										<div>
											<div className="flex justify-between text-sm text-white/70 mb-2">
												<span>Progress</span>
												<span>
													{typeof trackingData.progress === 'number' ? `${progressValue}%` : 'N/A'}
												</span>
											</div>
											<div className="w-full bg-[#020817] rounded-full h-2 border border-cyan-500/20">
												<motion.div
													initial={{ width: 0 }}
													animate={{ width: `${progressValue}%` }}
													transition={{ duration: 1, ease: "easeOut" }}
													className="bg-gradient-to-r from-cyan-500 to-[#00bfff] h-2 rounded-full shadow-lg shadow-cyan-500/50"
												/>
											</div>
										</div>
									);
								})()}
								<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm text-white/70">
									<div>
										<div className="font-semibold text-white">Origin</div>
										<div>{trackingData.origin || 'Not available'}</div>
									</div>
									<div>
										<div className="font-semibold text-white">Destination</div>
										<div>{trackingData.destination || 'Not available'}</div>
									</div>
									<div>
										<div className="font-semibold text-white">Container Type</div>
										<div>{trackingData.containerType || 'Not available'}</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>

					{/* Timeline */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<div className={cn(
							'relative rounded-2xl bg-[#0a1628]/50 backdrop-blur-sm',
							'border border-cyan-500/30',
							'shadow-lg shadow-cyan-500/10',
							'p-6 sm:p-8'
						)}>
							{/* Glowing border effect */}
							<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-50" />

							<div className="relative z-10">
								<h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
									Shipment Timeline
								</h3>
								<div className="relative">
									{/* Vertical Timeline Line */}
									<div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/40 via-cyan-500/20 to-transparent" />

									<div className="space-y-8">
										{timelineEvents.map((event, index) => (
											<TimelineEvent
												key={event.id || index}
												event={event}
												index={index}
											/>
										))}
										{timelineEvents.length === 0 && (
											<p className="text-sm text-white/60">No milestone history available yet.</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</Section>
			)}

			{/* Help Section */}
			<Section className="bg-[#020817] py-16 sm:py-20 lg:py-24">
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
					className="relative max-w-4xl mx-auto"
				>
					{/* Background gradient overlay */}
					<div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-cyan-500/10 to-cyan-500/5 rounded-2xl" />

					{/* Glass card */}
					<div
						className={cn(
							'relative rounded-2xl bg-[#0a1628]/50 backdrop-blur-sm',
							'border border-cyan-500/30',
							'shadow-lg shadow-cyan-500/10',
							'p-8 sm:p-10 md:p-12 lg:p-16 text-center'
						)}
					>
						{/* Glowing border effect */}
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-50" />

						<div className="relative z-10 space-y-6">
							<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
								Need Help Tracking?
							</h2>
							<p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
								Can&apos;t find your tracking number or need assistance? Our customer service team is here to help.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
								<Button
									size="lg"
									className={cn(
										'group relative overflow-hidden',
										'bg-[#00bfff] text-white hover:bg-[#00a8e6]',
										'shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50',
										'px-8 py-6 text-base sm:text-lg font-semibold',
										'transition-all duration-300',
										'flex items-center gap-2'
									)}
								>
									<Mail className="w-5 h-5" />
									<span>Contact Support</span>
								</Button>
								<Button
									variant="outline"
									size="lg"
									className={cn(
										'border-2 border-cyan-500/50 text-white hover:bg-cyan-500/10 hover:border-cyan-500',
										'px-8 py-6 text-base sm:text-lg font-semibold',
										'transition-all duration-300',
										'flex items-center gap-2'
									)}
								>
									<Phone className="w-5 h-5" />
									<span>+1 (234) 567-890</span>
								</Button>
							</div>
						</div>
					</div>
				</motion.div>
			</Section>
		</div>
	);
}

// Timeline Event Component
type TimelineEventProps = {
	event: TrackingEventEntry;
	index: number;
};

function TimelineEvent({ event, index }: TimelineEventProps) {
	const Icon = event.actual ? CheckCircle2 : Clock;

	return (
		<motion.div
			initial={{ opacity: 0, x: -20 }}
			animate={{ opacity: 1, x: 0 }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			className="relative flex items-start gap-6"
		>
			{/* Timeline Dot */}
			<div className="relative flex-shrink-0">
				<div className={cn(
					'w-12 h-12 rounded-full flex items-center justify-center border-2',
					event.actual
						? 'bg-cyan-500/20 border-cyan-500/60'
						: 'bg-[#020817] border-cyan-500/30'
				)}>
					<div className={cn(
						'absolute inset-0 rounded-full',
						event.actual ? 'bg-cyan-500/20 blur-md' : 'bg-cyan-500/10 blur-md'
					)} />
					<Icon className={cn(
						'relative w-5 h-5 z-10',
						event.actual ? 'text-cyan-400' : 'text-cyan-400/50'
					)} strokeWidth={1.5} />
				</div>
			</div>

			{/* Content */}
			<div className="flex-1 min-w-0 pt-1">
				<div className={cn(
					'rounded-lg p-4 sm:p-6',
					'bg-[#020817]/50 border',
					event.actual
						? 'border-cyan-500/30'
						: 'border-cyan-500/20'
				)}>
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
						<h4 className={cn(
							'text-base sm:text-lg font-semibold',
							event.actual ? 'text-white' : 'text-white/70'
						)}>
							{event.status}
						</h4>
						<span className="text-xs sm:text-sm text-white/50">{event.timestamp}</span>
					</div>
					<p className="text-sm sm:text-base text-white/70 mb-2">{event.description}</p>
					<div className="flex items-center gap-2 text-xs sm:text-sm text-cyan-400/70">
						<MapPin className="w-4 h-4" />
						<span>{event.location}</span>
					</div>
				</div>
			</div>
		</motion.div>
	);
}
