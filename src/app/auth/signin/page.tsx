"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Alert } from '@/components/ui/Alert';
import { cn } from '@/lib/utils';

export default function SignInPage() {
	const { t } = useTranslation();
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError('');

		try {
			const result = await signIn('credentials', {
				email,
				password,
				redirect: false,
			});

			if (result?.error) {
				setError('Invalid email or password');
			} else {
				router.push('/dashboard');
			}
		} catch {
			setError('An error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};


	return (
		<div className="min-h-screen bg-[#020817] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
			{/* Background Effects */}
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

			{/* Main Content */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="max-w-md w-full space-y-8 relative z-10"
			>
				{/* Glass Card */}
				<div className={cn(
					'relative rounded-2xl bg-[#0a1628]/50 backdrop-blur-sm',
					'border border-cyan-500/30',
					'shadow-lg shadow-cyan-500/10',
					'p-8 sm:p-10'
				)}>
					{/* Glowing border effect */}
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-50" />

					<div className="relative z-10 space-y-6">
						{/* Header */}
						<div className="text-center">
							<h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
								{t('auth.signIn')}
							</h1>
							<p className="text-white/70">
								{t('auth.signInSubtitle')}
							</p>
						</div>

						{/* Error Message */}
						{error && (
							<Alert variant="destructive">
								{error}
							</Alert>
						)}

						{/* Form */}
						<form onSubmit={handleSubmit} className="space-y-5">
							{/* Email Field */}
							<div>
								<label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
									{t('auth.email')}
								</label>
								<Input
									id="email"
									type="email"
									variant="glass-dark"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									leftIcon={<Mail className="w-5 h-5" />}
									placeholder="Enter your email"
								/>
							</div>

							{/* Password Field */}
							<div>
								<label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
									{t('auth.password')}
								</label>
								<Input
									id="password"
									type={showPassword ? 'text' : 'password'}
									variant="glass-dark"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									leftIcon={<Lock className="w-5 h-5" />}
									rightIcon={
										<button
											type="button"
											onClick={() => setShowPassword(!showPassword)}
											className="text-cyan-400/70 hover:text-cyan-400 transition-colors"
										>
											{showPassword ? (
												<EyeOff className="h-5 w-5" />
											) : (
												<Eye className="h-5 w-5" />
											)}
										</button>
									}
									placeholder="Enter your password"
								/>
							</div>

							{/* Submit Button */}
								<Button
									type="submit"
									disabled={isLoading}
									size="lg"
									className="w-full flex items-center justify-center gap-2 bg-brand-cyan text-white hover:bg-brand-cyan-dark"
								>
								{isLoading ? (
									<>
										<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
										<span>{t('auth.signingIn')}</span>
									</>
								) : (
									<>
										<span>{t('auth.signIn')}</span>
										<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
									</>
								)}
							</Button>
						</form>

						{/* Sign Up Link */}
						<div className="text-center pt-4">
							<p className="text-sm text-white/70">
								{t('auth.dontHaveAccount')}{' '}
								<button
									onClick={() => router.push('/auth/signup')}
									className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
								>
									{t('auth.signUp')}
								</button>
							</p>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
}
