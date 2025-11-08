import { createTheme } from '@mui/material/styles';
import { UnivirtusColors } from './colors';
import { UnivirtusTypography } from './typography';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: UnivirtusColors.actionPrimary,
    },
    secondary: {
      main: UnivirtusColors.actionSecondary,
    },
    background: {
      default: UnivirtusColors.backgroundDark,
      paper: UnivirtusColors.backgroundDarkAlt,
    },
    text: {
      primary: UnivirtusColors.textPrimary,
      secondary: UnivirtusColors.textSecondary,
    },
    error: {
      main: UnivirtusColors.alertNegative,
    },
  },
  typography: {
    fontFamily: 'Roboto, Inter, sans-serif',
    h4: {
      fontFamily: UnivirtusTypography.displayLarge.fontFamily,
      fontWeight: UnivirtusTypography.displayLarge.fontWeight,
      fontSize: UnivirtusTypography.displayLarge.fontSize,
      lineHeight: UnivirtusTypography.displayLarge.lineHeight,
    },
    h5: {
      fontFamily: UnivirtusTypography.titleLarge.fontFamily,
      fontWeight: UnivirtusTypography.titleLarge.fontWeight,
      fontSize: UnivirtusTypography.titleLarge.fontSize,
      lineHeight: UnivirtusTypography.titleLarge.lineHeight,
    },
    body1: {
      fontFamily: UnivirtusTypography.bodyLarge.fontFamily,
      fontWeight: UnivirtusTypography.bodyLarge.fontWeight,
      fontSize: UnivirtusTypography.bodyLarge.fontSize,
      lineHeight: UnivirtusTypography.bodyLarge.lineHeight,
    },
    body2: {
      fontFamily: UnivirtusTypography.bodyMedium.fontFamily,
      fontWeight: UnivirtusTypography.bodyMedium.fontWeight,
      fontSize: UnivirtusTypography.bodyMedium.fontSize,
      lineHeight: UnivirtusTypography.bodyMedium.lineHeight,
    },
  },
});
