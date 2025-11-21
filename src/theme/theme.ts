'use client';

import { createTheme } from '@mui/material/styles';

// Create a custom Material-UI theme
export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'var(--accent-gold)', // blue-500
      light: 'var(--accent-gold)', // blue-400
      dark: 'var(--accent-gold)', // blue-600
      contrastText: 'var(--background)',
    },
    secondary: {
      main: 'var(--accent-gold)', // violet-500
      light: 'var(--accent-gold)', // violet-400
      dark: 'var(--accent-gold)', // violet-600
      contrastText: 'var(--background)',
    },
    success: {
      main: 'var(--accent-gold)', // emerald-500
      light: 'var(--accent-gold)', // emerald-400
      dark: 'var(--accent-gold)', // emerald-600
    },
    warning: {
      main: 'var(--accent-gold)', // amber-500
      light: 'var(--accent-gold)', // amber-400
      dark: 'var(--accent-gold)', // amber-600
    },
    error: {
      main: 'var(--error)', // red-500
      light: 'var(--error)', // red-400
      dark: 'var(--error)', // red-600
    },
    info: {
      main: 'var(--accent-gold)', // cyan-500
      light: 'var(--accent-gold)', // cyan-400
      dark: 'var(--accent-gold)', // cyan-600
    },
    grey: {
      50: 'var(--background)',
      100: 'var(--panel)',
      200: 'var(--panel)',
      300: 'var(--border)',
      400: 'var(--text-secondary)',
      500: 'var(--text-secondary)',
      600: 'var(--text-secondary)',
      700: 'var(--text-secondary)',
      800: 'var(--text-primary)',
      900: 'var(--text-primary)',
    },
    background: {
      default: 'var(--background)',
      paper: 'var(--background)',
    },
    text: {
      primary: 'var(--text-primary)',
      secondary: 'var(--text-secondary)',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '1.875rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(var(--text-primary-rgb) / 0.05)',
    '0 1px 3px 0 rgb(var(--text-primary-rgb) / 0.1), 0 1px 2px -1px rgb(var(--text-primary-rgb) / 0.1)',
    '0 4px 6px -1px rgb(var(--text-primary-rgb) / 0.1), 0 2px 4px -2px rgb(var(--text-primary-rgb) / 0.1)',
    '0 10px 15px -3px rgb(var(--text-primary-rgb) / 0.1), 0 4px 6px -4px rgb(var(--text-primary-rgb) / 0.1)',
    '0 20px 25px -5px rgb(var(--text-primary-rgb) / 0.1), 0 8px 10px -6px rgb(var(--text-primary-rgb) / 0.1)',
    '0 25px 50px -12px rgb(var(--text-primary-rgb) / 0.25)',
    '0 1px 3px 0 rgb(var(--text-primary-rgb) / 0.1), 0 1px 2px -1px rgb(var(--text-primary-rgb) / 0.1)',
    '0 4px 6px -1px rgb(var(--text-primary-rgb) / 0.1), 0 2px 4px -2px rgb(var(--text-primary-rgb) / 0.1)',
    '0 10px 15px -3px rgb(var(--text-primary-rgb) / 0.1), 0 4px 6px -4px rgb(var(--text-primary-rgb) / 0.1)',
    '0 20px 25px -5px rgb(var(--text-primary-rgb) / 0.1), 0 8px 10px -6px rgb(var(--text-primary-rgb) / 0.1)',
    '0 25px 50px -12px rgb(var(--text-primary-rgb) / 0.25)',
    '0 1px 3px 0 rgb(var(--text-primary-rgb) / 0.1), 0 1px 2px -1px rgb(var(--text-primary-rgb) / 0.1)',
    '0 4px 6px -1px rgb(var(--text-primary-rgb) / 0.1), 0 2px 4px -2px rgb(var(--text-primary-rgb) / 0.1)',
    '0 10px 15px -3px rgb(var(--text-primary-rgb) / 0.1), 0 4px 6px -4px rgb(var(--text-primary-rgb) / 0.1)',
    '0 20px 25px -5px rgb(var(--text-primary-rgb) / 0.1), 0 8px 10px -6px rgb(var(--text-primary-rgb) / 0.1)',
    '0 25px 50px -12px rgb(var(--text-primary-rgb) / 0.25)',
    '0 1px 3px 0 rgb(var(--text-primary-rgb) / 0.1), 0 1px 2px -1px rgb(var(--text-primary-rgb) / 0.1)',
    '0 4px 6px -1px rgb(var(--text-primary-rgb) / 0.1), 0 2px 4px -2px rgb(var(--text-primary-rgb) / 0.1)',
    '0 10px 15px -3px rgb(var(--text-primary-rgb) / 0.1), 0 4px 6px -4px rgb(var(--text-primary-rgb) / 0.1)',
    '0 20px 25px -5px rgb(var(--text-primary-rgb) / 0.1), 0 8px 10px -6px rgb(var(--text-primary-rgb) / 0.1)',
    '0 25px 50px -12px rgb(var(--text-primary-rgb) / 0.25)',
    '0 1px 3px 0 rgb(var(--text-primary-rgb) / 0.1), 0 1px 2px -1px rgb(var(--text-primary-rgb) / 0.1)',
    '0 4px 6px -1px rgb(var(--text-primary-rgb) / 0.1), 0 2px 4px -2px rgb(var(--text-primary-rgb) / 0.1)',
    '0 10px 15px -3px rgb(var(--text-primary-rgb) / 0.1), 0 4px 6px -4px rgb(var(--text-primary-rgb) / 0.1)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 500,
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 1px 3px 0 rgb(var(--text-primary-rgb) / 0.1), 0 1px 2px -1px rgb(var(--text-primary-rgb) / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 3px 0 rgb(var(--text-primary-rgb) / 0.1), 0 1px 2px -1px rgb(var(--text-primary-rgb) / 0.1)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
  },
});

