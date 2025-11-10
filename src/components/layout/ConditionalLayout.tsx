"use client";

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/auth');

	return (
		<>
			{!isDashboard && <Header />}
			<main className="flex-1">
				{children}
			</main>
			{!isDashboard && <Footer />}
			{!isDashboard && <WhatsAppButton />}
		</>
	);
}

