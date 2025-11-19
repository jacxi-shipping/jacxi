"use client";

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Visibility, VisibilityOff, Email, Lock, ArrowForward } from '@mui/icons-material';
import { 
	Button, 
	TextField, 
	InputAdornment, 
	IconButton, 
	Alert, 
	CircularProgress, 
	Box, 
	Typography,
	Paper
} from '@mui/material';

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
		<Box
			sx={{
				minHeight: '100vh',
				bgcolor: '#020817',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				py: { xs: 6, sm: 12 },
				px: { xs: 2, sm: 3, lg: 4 },
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{/* Background Effects */}
			{/* Subtle geometric grid pattern background */}
			<Box
				sx={{
					position: 'absolute',
					inset: 0,
					opacity: 0.03,
				}}
			>
				<svg style={{ width: '100%', height: '100%' }} preserveAspectRatio="none">
					<defs>
						<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
							<path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" fill="url(#grid)" style={{ color: 'rgb(34, 211, 238)' }} />
				</svg>
			</Box>

			{/* Subtle blue gradient overlay */}
			<Box
				sx={{
					position: 'absolute',
					inset: 0,
					background: 'linear-gradient(135deg, #020817 0%, #0a1628 50%, #020817 100%)',
				}}
			/>

			{/* Main Content */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				style={{ maxWidth: 448, width: '100%', position: 'relative', zIndex: 10 }}
			>
				{/* Glass Card */}
				<Paper
					elevation={0}
					sx={{
						position: 'relative',
						borderRadius: 4,
						background: 'rgba(10, 22, 40, 0.5)',
						backdropFilter: 'blur(8px)',
						border: '1px solid rgba(6, 182, 212, 0.3)',
						boxShadow: '0 8px 32px rgba(6, 182, 212, 0.1)',
						p: { xs: 4, sm: 5 },
						overflow: 'hidden',
						'&::before': {
							content: '""',
							position: 'absolute',
							inset: 0,
							borderRadius: 4,
							background: 'linear-gradient(90deg, rgba(6, 182, 212, 0) 0%, rgba(6, 182, 212, 0.1) 50%, rgba(6, 182, 212, 0) 100%)',
							opacity: 0.5,
						},
					}}
				>
					<Box sx={{ position: 'relative', zIndex: 1 }}>
						{/* Header */}
						<Box sx={{ textAlign: 'center', mb: 3 }}>
							<Typography
								variant="h3"
								sx={{
									fontSize: { xs: '1.875rem', sm: '2.25rem' },
									fontWeight: 700,
									color: 'white',
									mb: 1,
								}}
							>
								{t('auth.signIn')}
							</Typography>
							<Typography
								variant="body1"
								sx={{
									color: 'rgba(255, 255, 255, 0.7)',
								}}
							>
								{t('auth.signInSubtitle')}
							</Typography>
						</Box>

						{/* Error Message */}
						{error && (
							<Alert 
								severity="error"
								sx={{
									mb: 2,
									bgcolor: 'rgba(239, 68, 68, 0.1)',
									border: '1px solid rgba(239, 68, 68, 0.3)',
									color: 'rgb(248, 113, 113)',
									'& .MuiAlert-icon': {
										color: 'rgb(248, 113, 113)',
									},
								}}
							>
								{error}
							</Alert>
						)}

						{/* Form */}
						<Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
							{/* Email Field */}
							<Box>
								<Typography
									component="label"
									htmlFor="email"
									sx={{
										display: 'block',
										fontSize: '0.875rem',
										fontWeight: 500,
										color: 'rgba(255, 255, 255, 0.9)',
										mb: 1,
									}}
								>
									{t('auth.email')}
								</Typography>
								<TextField
									id="email"
									type="email"
									fullWidth
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									placeholder="Enter your email"
									autoComplete="email"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Email sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.5)' }} />
											</InputAdornment>
										),
									}}
									sx={{
										'& .MuiOutlinedInput-root': {
											bgcolor: 'rgba(255, 255, 255, 0.05)',
											borderRadius: 2,
											color: 'white',
											'& fieldset': {
												borderColor: 'rgba(255, 255, 255, 0.2)',
											},
											'&:hover fieldset': {
												borderColor: 'rgba(255, 255, 255, 0.3)',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'rgb(34, 211, 238)',
												borderWidth: 2,
											},
											'& input': {
												color: 'white',
												'&::placeholder': {
													color: 'rgba(255, 255, 255, 0.5)',
													opacity: 1,
												},
												'&:-webkit-autofill': {
													WebkitBoxShadow: '0 0 0 100px rgba(10, 22, 40, 0.8) inset',
													WebkitTextFillColor: 'white',
												},
											},
										},
									}}
								/>
							</Box>

							{/* Password Field */}
							<Box>
								<Typography
									component="label"
									htmlFor="password"
									sx={{
										display: 'block',
										fontSize: '0.875rem',
										fontWeight: 500,
										color: 'rgba(255, 255, 255, 0.9)',
										mb: 1,
									}}
								>
									{t('auth.password')}
								</Typography>
								<TextField
									id="password"
									type={showPassword ? 'text' : 'password'}
									fullWidth
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									placeholder="Enter your password"
									autoComplete="current-password"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<Lock sx={{ fontSize: 20, color: 'rgba(255, 255, 255, 0.5)' }} />
											</InputAdornment>
										),
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													onClick={() => setShowPassword(!showPassword)}
													edge="end"
													sx={{
														color: 'rgba(34, 211, 238, 0.7)',
														'&:hover': {
															color: 'rgb(34, 211, 238)',
														},
													}}
												>
													{showPassword ? (
														<VisibilityOff sx={{ fontSize: 20 }} />
													) : (
														<Visibility sx={{ fontSize: 20 }} />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
									sx={{
										'& .MuiOutlinedInput-root': {
											bgcolor: 'rgba(255, 255, 255, 0.05)',
											borderRadius: 2,
											color: 'white',
											'& fieldset': {
												borderColor: 'rgba(255, 255, 255, 0.2)',
											},
											'&:hover fieldset': {
												borderColor: 'rgba(255, 255, 255, 0.3)',
											},
											'&.Mui-focused fieldset': {
												borderColor: 'rgb(34, 211, 238)',
												borderWidth: 2,
											},
											'& input': {
												color: 'white',
												'&::placeholder': {
													color: 'rgba(255, 255, 255, 0.5)',
													opacity: 1,
												},
												'&:-webkit-autofill': {
													WebkitBoxShadow: '0 0 0 100px rgba(10, 22, 40, 0.8) inset',
													WebkitTextFillColor: 'white',
												},
											},
										},
									}}
								/>
							</Box>

							{/* Submit Button */}
							<Button
								type="submit"
								disabled={isLoading}
								variant="contained"
								size="large"
								endIcon={!isLoading && <ArrowForward />}
								sx={{
									width: '100%',
									bgcolor: '#00bfff',
									color: 'white',
									fontWeight: 600,
									py: 1.5,
									fontSize: '1rem',
									'&:hover': {
										bgcolor: '#00a8e6',
									},
									'&:disabled': {
										bgcolor: 'rgba(0, 191, 255, 0.5)',
										color: 'rgba(255, 255, 255, 0.7)',
									},
								}}
							>
								{isLoading ? (
									<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
										<CircularProgress size={20} sx={{ color: 'white' }} />
										<Typography component="span">{t('auth.signingIn')}</Typography>
									</Box>
								) : (
									<Typography component="span">{t('auth.signIn')}</Typography>
								)}
							</Button>
						</Box>

						{/* Sign Up Link */}
						<Box sx={{ textAlign: 'center', pt: 2 }}>
							<Typography variant="body2" sx={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
								{t('auth.dontHaveAccount')}{' '}
								<Typography
									component="button"
									onClick={() => router.push('/auth/signup')}
									sx={{
										background: 'none',
										border: 'none',
										color: 'rgb(34, 211, 238)',
										fontWeight: 500,
										cursor: 'pointer',
										transition: 'color 0.2s ease',
										'&:hover': {
											color: 'rgb(6, 182, 212)',
										},
									}}
								>
									{t('auth.signUp')}
								</Typography>
							</Typography>
						</Box>
					</Box>
				</Paper>
			</motion.div>
		</Box>
	);
}


