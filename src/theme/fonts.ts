import { Lexend, Roboto_Flex } from 'next/font/google'

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

export const fonts = {
  heading: headingFont.style.fontFamily,
  body: bodyFont.style.fontFamily
}

export default fonts
