// constants/colors.ts - Fixed Design System

export const colors = {
  // Primary Colors
  primary: "#6366f1", // Modern indigo
  primaryLight: "#a5b4fc",
  primaryDark: "#4338ca",
  
  // Secondary Colors
  secondary: "#64748b",
  secondaryLight: "#94a3b8",
  secondaryDark: "#475569",
  
  // Background & Surface
  background: "#ffffff",
  backgroundDark: "#0f172a",
  surface: "#f8fafc",
  surfaceElevated: "#ffffff",
  
  // Text Colors
  text: "#1e293b",
  textSecondary: "#64748b",
  textLight: "#94a3b8",
  textInverse: "#ffffff",
  
  // Status Colors
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  
  // Accent Colors
  accent: "#ec4899",
  accentLight: "#f9a8d4",
  
  // Neutral Grays
  gray50: "#f8fafc",
  gray100: "#f1f5f9",
  gray200: "#e2e8f0",
  gray300: "#cbd5e1",
  gray400: "#94a3b8",
  gray500: "#64748b",
  gray600: "#475569",
  gray700: "#334155",
  gray800: "#1e293b",
  gray900: "#0f172a",
  
  // Border & Divider
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  divider: "#e2e8f0",
  
  // Legacy (for backward compatibility)
  black: "#000000",
  white: "#ffffff",
  card: "#f8fafc",
  notification: "#ef4444",
}

// Design Tokens
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
}

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
}

export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  fontWeights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  }
}

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
}