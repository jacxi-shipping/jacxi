import type { LucideIcon } from 'lucide-react';
import { Car, Truck, Package, Ship, Stamp, LocateFixed } from 'lucide-react';

export type SolutionItem = {
	icon: LucideIcon;
	title: string;
	description: string;
};

export const SOLUTIONS: SolutionItem[] = [
	{
		icon: Car,
		title: 'Luxury Vehicle Transport',
		description:
			'White-glove insured handling for high-value care',
	},
	{
		icon: Truck,
		title: 'Corporate Fleet Shipping',
		description:
			'Efficient shipping solutions for businesses and dealerships',
	},
	{
		icon: Package,
		title: 'High-Value Cargo',
		description:
			'Secure transport for traditional and sensitive cargo',
	},
];

export type StepItem = {
	icon: LucideIcon;
	label: string;
};

export const STEPS: StepItem[] = [
	{ icon: Car, label: 'Vehicle Pickup' },
	{ icon: Stamp, label: 'Customs and Ins.' },
	{ icon: Ship, label: 'Sea/Air Freight' },
	{ icon: LocateFixed, label: 'Delivery in Middle East' },
];

export type TestimonialItem = {
	quote: string;
	name: string;
	title: string;
};

export const TESTIMONIALS: TestimonialItem[] = [
	{
		quote:
			"Our UAE dealership trusts Jacxi for every U.S. import. Their certified process and white‑glove handling give us complete confidence.",
		name: 'Mohammed Al Zaabi',
		title: 'General Manager, Premium Motors Dubai',
	},
	{
		quote:
			"Exceptional visibility and care. Insurance and tracking made a complex shipment feel effortless.",
		name: 'Sara Al Mansoori',
		title: 'Operations Lead, Elite Auto',
	},
	{
		quote:
			"Jacxi handled our luxury vehicle shipment with absolute professionalism. The government-certified process and real-time tracking gave us peace of mind throughout.",
		name: 'Ahmed Al-Rashid',
		title: 'CEO, Luxury Auto Group',
	},
	{
		quote:
			"The best shipping experience we've had. From pickup to delivery, every step was seamless and transparent.",
		name: 'Fatima Hassan',
		title: 'Fleet Manager, Corporate Transport Co.',
	},
	{
		quote:
			"VIP-grade service that exceeded our expectations. Our high-value vehicles arrived in perfect condition.",
		name: 'Khalid Al-Mazrouei',
		title: 'Director, Premium Imports LLC',
	},
	{
		quote:
			"Reliable, insured, and fully compliant. Jacxi is our trusted partner for all international vehicle shipments.",
		name: 'David Chen',
		title: 'Operations Director, Global Logistics',
	},
];


