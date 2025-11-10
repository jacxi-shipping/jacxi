import Hero from '@/components/landing/Hero';
import Solutions from '@/components/landing/Solutions';
import HowItWorks from '@/components/landing/HowItWorks';
import GlobalReach from '@/components/landing/GlobalReach';
import Testimonials from '@/components/landing/Testimonials';
import FinalCTA from '@/components/landing/FinalCTA';

export default function Home() {
	return (
		<>
			<Hero />
			<Solutions />
			<HowItWorks />
			<GlobalReach />
			<Testimonials />
			<FinalCTA />
		</>
	);
}
