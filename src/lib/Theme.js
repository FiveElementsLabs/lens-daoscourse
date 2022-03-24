import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

/*
 *  Extend the default theme to include custom
 *  colors, fonts, options, etc.
 */

const colors = {
  primary: '#0055FF',
  light_accent: '#ECF1FE',
  light_azure: '#C5E2FC',
  light_background: '#D9E4FD',
  dark_accent: '#04143A',
  dark_azure: '#1A365D',
  dark_background: '#122451',
  yellow_accent: '#FF9900',
};

const styles = {
  global: props => ({
    body: {
      bg: mode('light_background', 'dark_background')(props),
    },
  }),
};

const components = {
  Button: {
    variants: {
      brand: props => ({
        backgroundColor: mode('yellow_accent', 'primary')(props),
      }),
    },
  },
};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const Theme = extendTheme({ colors, styles, components, config });

export default Theme;
