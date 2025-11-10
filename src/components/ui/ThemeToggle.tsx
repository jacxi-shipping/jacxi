"use client";

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { Button } from './Button';
import { cn } from '@/lib/utils';

export default function ThemeToggle({ className }: { className?: string }) {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={toggleTheme}
			className={cn('h-10 w-10 rounded-lg text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5', className)}
			aria-label="Toggle theme"
		>
			{theme === 'dark' ? (
				<Sun className="h-5 w-5" />
			) : (
				<Moon className="h-5 w-5" />
			)}
		</Button>
	);
}
