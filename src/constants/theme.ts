export const COLORS = {
  primary: '#6B4EFF',
  primaryLight: '#8A75FF',
  primaryDark: '#4A3BB2',
  white: '#FFFFFF',
  lightGray: '#F5F5F5',
  gray: '#E0E0E0',
  darkGray: '#757575',
  black: '#212121',
  error: '#FF5252',
  success: '#4CAF50',
  info: '#2196F3',
};

export const FONTS = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
};

export const SIZES = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 32,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export type ThemeType = 'light' | 'dark';

export const lightTheme = {
  ...COLORS,
  background: COLORS.white,
  text: COLORS.black,
  cardBackground: COLORS.lightGray,
  borderColor: COLORS.gray,
  statusBar: 'dark-content' as const,
};

export const darkTheme = {
  ...COLORS,
  background: '#121212',
  text: COLORS.white,
  cardBackground: '#1E1E1E',
  borderColor: '#333333',
  statusBar: 'light-content' as const,
};

export const getTheme = (themeType: ThemeType) => {
  return themeType === 'light' ? lightTheme : darkTheme;
}; 