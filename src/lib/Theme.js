import { extendTheme } from '@chakra-ui/react';

/*
 *  Extend the default theme to include custom
 *  colors, fonts, options, etc.
 */

const colors = {};

const components = {};

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

const Theme = extendTheme({ colors, components, config });

export default Theme;
