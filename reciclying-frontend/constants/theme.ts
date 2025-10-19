/**
 * Brand-compliant color palette and typography system for Solarpunk Recycling App
 * Based on detailed design specifications
 */

import { Platform } from 'react-native';

// Brand Color Palette
export const BrandColors = {
  // Primary colors
  primaryBackground: '#FFFFFF',
  primaryInk: '#303434',
  secondaryInk: '#7E96A0',
  borders: '#CAD2D8',
  accentOutline: '#CFC493', // USF Gold
  brandEmphasis: '#006747', // USF Green
  positiveAccent: '#009374', // Teal
  optionalSurface: '#EDEBD1', // Sand
  
  // Supportive accents (for charts/tags only)
  apple: '#9CCB3B',
  seaglass: '#80B0A6',
  storm: '#006484',
  sky: '#29AFCE',
  
  // Additional UI colors
  error: '#DC2626', // Deep neutral red
  white: '#FFFFFF',
  black: '#000000',
};

export const Colors = {
  light: {
    text: BrandColors.primaryInk,
    background: BrandColors.primaryBackground,
    tint: BrandColors.brandEmphasis,
    icon: BrandColors.secondaryInk,
    tabIconDefault: BrandColors.secondaryInk,
    tabIconSelected: BrandColors.brandEmphasis,
    border: BrandColors.borders,
    placeholder: BrandColors.secondaryInk,
    error: BrandColors.error,
    accent: BrandColors.accentOutline,
    positive: BrandColors.positiveAccent,
    surface: BrandColors.optionalSurface,
  },
  dark: {
    text: BrandColors.white,
    background: BrandColors.primaryInk,
    tint: BrandColors.positiveAccent,
    icon: BrandColors.secondaryInk,
    tabIconDefault: BrandColors.secondaryInk,
    tabIconSelected: BrandColors.positiveAccent,
    border: BrandColors.borders,
    placeholder: BrandColors.secondaryInk,
    error: BrandColors.error,
    accent: BrandColors.accentOutline,
    positive: BrandColors.positiveAccent,
    surface: BrandColors.optionalSurface,
  },
};

// Typography System
export const Typography = {
  // Title styles - 28dp, mixed weights
  title: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800' as const,
    color: BrandColors.primaryInk,
  },
  titleSecond: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '400' as const,
    color: BrandColors.primaryInk,
  },
  
  // Field labels - 11dp, uppercase, tracking +2%
  fieldLabel: {
    fontSize: 11,
    fontWeight: '600' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 0.22, // +2% tracking
    color: BrandColors.secondaryInk,
    marginBottom: 6,
  },
  
  // Input text - 16dp
  inputText: {
    fontSize: 16,
    color: BrandColors.primaryInk,
    fontWeight: '400' as const,
  },
  
  // Placeholder text - 16dp, 70% opacity
  placeholderText: {
    fontSize: 16,
    color: `${BrandColors.secondaryInk}B3`, // 70% opacity
    fontWeight: '400' as const,
  },
  
  // Helper/error text - 12dp
  helperText: {
    fontSize: 12,
    color: BrandColors.secondaryInk,
    fontWeight: '400' as const,
  },
  
  // Error text - 12dp, red
  errorText: {
    fontSize: 12,
    color: BrandColors.error,
    fontWeight: '400' as const,
  },
  
  // Links - 14dp, USF Green
  linkText: {
    fontSize: 14,
    color: BrandColors.brandEmphasis,
    fontWeight: '400' as const,
  },
  
  // Button text - 15-16dp, medium weight
  buttonText: {
    fontSize: 16,
    fontWeight: '500' as const,
    color: BrandColors.white,
  },
  
  // Footer text - 14dp
  footerText: {
    fontSize: 14,
    color: BrandColors.secondaryInk,
    fontWeight: '400' as const,
  },
  
  // "or" divider text - 12dp
  dividerText: {
    fontSize: 12,
    color: BrandColors.secondaryInk,
    fontWeight: '400' as const,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

// Spacing System
export const Spacing = {
  screen: 20,
  titleTop: 24,
  labelToField: 6,
  fieldToLabel: 16,
  fieldToHelper: 8,
  blockGap: 24,
  footerGap: 24,
  dividerMargin: 14,
};

// Component Dimensions
export const Dimensions = {
  inputHeight: 48,
  inputRadius: 8,
  buttonHeight: 48,
  buttonRadius: 24,
  socialButtonSize: 48,
  socialButtonRadius: 10,
  iconSize: 24,
  touchTarget: 44,
  dismissButtonSize: 44,
};
