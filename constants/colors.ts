// constants/colors.ts - Enhanced Design System with 2025 Trends

export const colors = {
  // Primary Colors - Modern gradient approach
  primary: "#6366f1", // Modern indigo
  primaryLight: "#8b5cf6", // Purple accent
  primaryDark: "#4338ca",
  primaryGradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
  
  // Secondary Colors with more personality
  secondary: "#64748b",
  secondaryLight: "#94a3b8",
  secondaryDark: "#475569",
  accent: "#ec4899", // Hot pink for excitement
  accentLight: "#f9a8d4",
  accentSecondary: "#06b6d4", // Cyan for tech feel
  
  // Background & Surface - Adaptive dark/light
  background: "#ffffff",
  backgroundDark: "#0f172a",
  backgroundSecondary: "#f8fafc",
  surface: "#ffffff",
  surfaceElevated: "#ffffff",
  surfaceDark: "#1e293b",
  surfaceElevatedDark: "#334155",
  
  // Glass morphism colors
  glass: "rgba(255, 255, 255, 0.1)",
  glassDark: "rgba(0, 0, 0, 0.2)",
  glassBlur: "rgba(255, 255, 255, 0.05)",
  
  // Text Colors with improved contrast
  text: "#1e293b",
  textSecondary: "#64748b",
  textLight: "#94a3b8",
  textInverse: "#ffffff",
  textDark: "#ffffff",
  textSecondaryDark: "#cbd5e1",
  
  // Status Colors - Vibrant and modern
  success: "#10b981",
  successLight: "#34d399",
  warning: "#f59e0b",
  warningLight: "#fbbf24",
  error: "#ef4444",
  errorLight: "#f87171",
  info: "#3b82f6",
  infoLight: "#60a5fa",
  
  // Safety & Emergency Colors
  emergency: "#dc2626",
  emergencyLight: "#fecaca",
  safe: "#16a34a",
  safeLight: "#bbf7d0",
  
  // Neutral Grays - Extended palette
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
  borderDark: "#374151",
  divider: "#e2e8f0",
  dividerDark: "#374151",
  
  // Motorcycle specific colors
  motorcycle: "#f97316", // Orange for bikes
  route: "#8b5cf6", // Purple for routes
  destination: "#ec4899", // Pink for destinations
  
  // Legacy (for backward compatibility)
  black: "#000000",
  white: "#ffffff",
  card: "#f8fafc",
  cardDark: "#1e293b",
  notification: "#ef4444",
}

// Enhanced Design Tokens with 2025 standards
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  xxxxl: 80,
}

export const borderRadius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  full: 9999,
  // Neumorphism specific radii
  neu: 20,
  neuLarge: 32,
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
    xxxxl: 40,
    display: 48,
    hero: 64,
  },
  fontWeights: {
    thin: '100' as const,
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
    loose: 1.8,
  }
}

export const shadows = {
  xs: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 1,
    elevation: 1,
  },
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
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
  xl: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
  // Neumorphism shadows
  neuInset: {
    shadowColor: "#000",
    shadowOffset: { width: -2, height: -2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 0,
  },
  neuOutset: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  // Glassmorphism glow
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 0,
  },
}

// Animation timing constants
export const animations = {
  timing: {
    fast: 150,
    normal: 250,
    slow: 350,
    verySlow: 500,
  },
  easing: {
    easeOut: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    easeIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
    easeInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  }
}

// Device breakpoints for responsive design
export const breakpoints = {
  small: 320,
  medium: 768,
  large: 1024,
  xlarge: 1280,
}

// Theme configuration for dark/light mode
export const theme = {
  light: {
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    textSecondary: colors.textSecondary,
    border: colors.border,
    shadow: shadows.md,
  },
  dark: {
    background: colors.backgroundDark,
    surface: colors.surfaceDark,
    text: colors.textDark,
    textSecondary: colors.textSecondaryDark,
    border: colors.borderDark,
    shadow: shadows.lg,
  }
}

// Component specific design tokens
export const components = {
  button: {
    height: {
      sm: 36,
      md: 44,
      lg: 52,
      xl: 60,
    },
    borderRadius: borderRadius.md,
  },
  input: {
    height: 48,
    borderRadius: borderRadius.md,
  },
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
  },
  modal: {
    borderRadius: borderRadius.xl,
  }
}