import { mode } from '@chakra-ui/theme-tools'
import { Roboto_Flex, Lexend } from 'next/font/google'

const bodyFont = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap'
})
const headingFont = Lexend({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap'
})

export const globalStyles = {
  colors: {
    brand: {
      100: '#F0F0F0',
      200: 'yellow',
      300: '#000',
      400: '#FFF',
      500: '#6837D1',
      600: '#551FC9',
      700: 'purple',
      800: 'violet',
      900: 'orange'
    },
    brandScheme: {
      100: '#E9E3FF',
      200: '#7551FF',
      300: '#7551FF',
      400: '#7551FF',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#02044A'
    },
    brandTabs: {
      100: '#E9E3FF',
      200: '#422AFB',
      300: '#422AFB',
      400: '#422AFB',
      500: '#422AFB',
      600: '#3311DB',
      700: '#02044A',
      800: '#190793',
      900: '#02044A'
    },
    secondaryGray: {
      100: '#E0E5F2',
      200: '#E1E9F8',
      300: '#F4F7FE',
      400: '#E9EDF7',
      500: '#8F9BBA',
      600: '#A3AED0',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559'
    },
    black: {
      500: '#000000',
      600: '#333333',
      700: '#707EAE',
      800: '#707EAE',
      900: '#1B2559'
    },
    purple: {
      600: '#49347B'
    },
    red: {
      100: '#FEEFEE',
      500: '#EE5D50',
      600: '#E31A1A'
    },
    blue: {
      50: '#EFF4FB',
      500: '#3965FF'
    },
    orange: {
      100: '#FFF6DA',
      500: '#FFB547'
    },
    green: {
      100: '#E6FAF5',
      500: '#01B574'
    },
    navy: {
      50: '#d0dcfb',
      100: '#aac0fe',
      200: '#a3b9f8',
      300: '#728fea',
      400: '#3652ba',
      500: '#1b3bbb',
      600: '#24388a',
      700: '#1B254B',
      800: '#111c44',
      900: '#0b1437'
    },
    gray: {
      100: '#FAFCFE'
    },
    primary: {
      default: 'red.500',
      _dark: 'red.400'
    },
    secondary: {
      default: 'red.800',
      _dark: 'red.700'
    }
  },
  fonts: {
    heading: headingFont.style.fontFamily,
    body: bodyFont.style.fontFamily
  },
  radii: {
    none: '0',
    sm: '0.3rem',
    base: '0.6rem',
    md: '0.6rem',
    lg: '0.8rem',
    xl: '1rem',
    '2xl': '1.4rem',
    '3xl': '1.8rem',
    full: '9999px'
  },
  shadows: {
    base: '0 3px 9px rgba(0,0,0,0.05)',
    xs: '0 1px 3px rgba(0,0,0,0.04)',
    sm: '0 2px 6px rgba(0,0,0,0.05)',
    md: '0 3px 9px rgba(0,0,0,0.05)',
    lg: 'none',
    xl: 'none',
    '2xl': 'none'
  },
  styles: {
    global: (props: any) => ({
      body: {
        overflowX: 'hidden',
        bg: mode('#fdfeff', 'navy.900')(props),
        letterSpacing: '-0.5px'
      },
      input: {
        color: 'gray.700'
      }
    })
  }
}
