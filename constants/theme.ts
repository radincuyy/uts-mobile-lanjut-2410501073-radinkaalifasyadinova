/**
 * ResepKita Design Token System
 *
 * Color Reference:
 *   Primary: #DC2626 (warm red)
 *   Secondary: #F87171 (light coral)
 *   CTA/Accent: #CA8A04 (warm gold)
 *   Background: #FEF2F2 (warm cream)
 *   Text: #450A0A (deep brown-red)
 */

export const Colors = {
  light: {
    text: "#3D1C11", // Deep warm brown — high contrast on cream
    textSecondary: "#7C5A4A", // Medium brown
    textMuted: "#A88979", // Warm muted brown
    background: "#FDF8F5", // Warm off-white cream
    backgroundSecondary: "#F5ECE5", // Slightly darker cream
    card: "#FFFFFF",
    cardBorder: "#EDE0D4", // Warm card border
    tint: "#D94F30", // Warm terracotta (CTA/accent)
    tintSoft: "#FDF0EB", // Very light terracotta
    icon: "#7C5A4A",
    tabIconDefault: "#B09486",
    tabIconSelected: "#D94F30",
    success: "#2D8A4E",
    successSoft: "#E6F4EA",
    danger: "#C62828",
    dangerSoft: "#FEECEB",
    separator: "#EDE0D4",
    badge: "#F5ECE5",
  },
  dark: {
    text: "#F5ECE5", // Warm cream text
    textSecondary: "#C4A99A", // Medium warm
    textMuted: "#8B7365", // Muted warm brown
    background: "#1A110D", // Very dark warm brown
    backgroundSecondary: "#2A1D16", // Dark warm
    card: "#2A1D16",
    cardBorder: "#3D2D22", // Warm dark border
    tint: "#F0845A", // Lighter terracotta for dark mode
    tintSoft: "#2A1A14", // Very dark terracotta
    icon: "#C4A99A",
    tabIconDefault: "#8B7365",
    tabIconSelected: "#F0845A",
    success: "#4CAF50",
    successSoft: "#1B3620",
    danger: "#EF5350",
    dangerSoft: "#3C1616",
    separator: "#3D2D22",
    badge: "#3D2D22",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const Touch = {
  minHeight: 48,
  minWidth: 48,
} as const;
