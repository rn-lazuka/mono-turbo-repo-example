import '@mui/material/styles';
import { PaletteColorOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeText {
    darker: string;
    black: string;
    white: string;
    green: string;
  }

  interface Palette {
    surface: PaletteColor;
    icon: PaletteColor;
    background: PaletteColor;
    neutral: PaletteColor;
    neutralVariant: PaletteColor;
    border: PaletteColor;
  }

  interface PaletteOptions {
    surface: PaletteColorOptions;
    icon: PaletteColorOptions;
    background: PaletteColorOptions;
    neutral: PaletteColorOptions;
    neutralVariant: PaletteColorOptions;
    border: PaletteColorOptions;
  }

  interface PaletteColor {
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    95: string;
    99: string;
    100: string;
    default?: string;
  }

  interface SimplePaletteColorOptions {
    0: string;
    10: string;
    20: string;
    30: string;
    40: string;
    50: string;
    60: string;
    70: string;
    80: string;
    90: string;
    95: string;
    99: string;
    100: string;
    default?: string;
  }

  interface TypographyVariants {
    headerXL: CSSProperties;
    headerL: CSSProperties;
    headerM: CSSProperties;
    headerS: CSSProperties;
    textXXL: CSSProperties;
    textXXLSB: CSSProperties;
    textXXLB: CSSProperties;
    textXL: CSSProperties;
    textXLSB: CSSProperties;
    textL: CSSProperties;
    textM: CSSProperties;
    textMSB: CSSProperties;
    textS: CSSProperties;
    textSSB: CSSProperties;
    textXS: CSSProperties;
    labelL: CSSProperties;
    labelLSB: CSSProperties;
    labelM: CSSProperties;
    labelMSB: CSSProperties;
    labelMCaps: CSSProperties;
    labelS: CSSProperties;
    labelSCapsSB: CSSProperties;
    labelSSB: CSSProperties;
    labelSCaps: CSSProperties;
    labelXS: CSSProperties;
    labelXXS: CSSProperties;
    labelXXSCapsSB: CSSProperties;
  }
  interface TypographyVariantsOptions {
    headerXL: CSSProperties;
    headerL: CSSProperties;
    headerM: CSSProperties;
    headerS: CSSProperties;
    textXXL: CSSProperties;
    textXXLSB: CSSProperties;
    textXXLB: CSSProperties;
    textXL: CSSProperties;
    textXLSB: CSSProperties;
    textL: CSSProperties;
    textM: CSSProperties;
    textMSB: CSSProperties;
    textS: CSSProperties;
    textSSB: CSSProperties;
    textXS: CSSProperties;
    labelL: CSSProperties;
    labelLSB: CSSProperties;
    labelM: CSSProperties;
    labelMSB: CSSProperties;
    labelMCaps: CSSProperties;
    labelS: CSSProperties;
    labelSCapsSB: CSSProperties;
    labelSSB: CSSProperties;
    labelSCaps: CSSProperties;
    labelXS: CSSProperties;
    labelXXS: CSSProperties;
    labelXXSCapsSB: CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    headerXL: true;
    headerL: true;
    headerM: true;
    headerS: true;
    textXXL: true;
    textXXLSB: true;
    textXXLB: true;
    textXL: true;
    textXLSB: true;
    textL: true;
    textM: true;
    textMSB: true;
    textS: true;
    textSSB: true;
    textXS: true;
    labelL: true;
    labelLSB: true;
    labelM: true;
    labelMSB: true;
    labelMCaps: true;
    labelS: true;
    labelSCapsSB: true;
    labelSSB: true;
    labelSCaps: true;
    labelXS: true;
    labelXXS: true;
    labelXXSCapsSB: true;

    // Disable all default MUI variants
    h1: false;
    h2: false;
    h3: false;
    h4: false;
    h5: false;
    h6: false;
    subtitle1: false;
    subtitle2: false;
    body1: false;
    body2: false;
    button: false;
    caption: false;
    overline: false;
  }
}
