import GlobalStyles from '@mui/material/GlobalStyles';

export const globalStyles = (
  <GlobalStyles
    styles={(theme) => [
      {
        html: {
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          boxSizing: 'border-box',
          WebkitTextSizeAdjust: '100%',
        },
        '*, *::before, *::after': {
          boxSizing: 'inherit',
        },
        body: {
          margin: 0,
          ...theme.typography.textM,
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.default,
          height: '100dvh',
          width: '100dvw',
          display: 'initial',
        },
        root: {
          width: '100%',
        },
        'strong, b': {
          fontWeight: theme.typography.fontWeightBold,
        },
        a: {
          textDecoration: 'none',
        },
        figure: {
          margin: 0,
        },
        reactResizable: {
          position: 'relative',
          backgroundClip: 'padding-box',
        },
      },
    ]}
  />
);
