"use client";

import { createContext, useContext, useLayoutEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
	theme: Theme;
	toggleTheme: () => void;
	setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getInitialTheme(): Theme {
	if (typeof window === 'undefined') return 'dark';
	
	// Check localStorage first
	const savedTheme = localStorage.getItem('theme') as Theme | null;
	if (savedTheme === 'light' || savedTheme === 'dark') {
		return savedTheme;
	}
	
	// Fall back to system preference
	const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	return systemTheme;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<Theme>(() => getInitialTheme());

	const updateDocumentClass = (newTheme: Theme) => {
		if (typeof window === 'undefined') return;
		const root = document.documentElement;
		// Tailwind dark mode only uses 'dark' class
		// When 'dark' is present = dark mode, when absent = light mode
		if (newTheme === 'dark') {
			root.classList.add('dark');
		} else {
			root.classList.remove('dark');
		}
	};

	// Use useLayoutEffect to update DOM synchronously before paint
	useLayoutEffect(() => {
		updateDocumentClass(theme);
	}, [theme]);

	const toggleTheme = () => {
		setTheme((prevTheme) => {
			const newTheme = prevTheme === 'dark' ? 'light' : 'dark';
			// Update localStorage
			if (typeof window !== 'undefined') {
				localStorage.setItem('theme', newTheme);
			}
			// updateDocumentClass will be called by useLayoutEffect
			return newTheme;
		});
	};

	const setThemeValue = (newTheme: Theme) => {
		setTheme(newTheme);
		if (typeof window !== 'undefined') {
			localStorage.setItem('theme', newTheme);
		}
		// updateDocumentClass will be called by useLayoutEffect
	};

	// Always provide the context, even during SSR
	return (
		<ThemeContext.Provider value={{ theme, toggleTheme, setTheme: setThemeValue }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
}
