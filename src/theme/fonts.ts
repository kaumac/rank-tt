import { Manrope } from 'next/font/google'

const globalFont = Manrope({
  subsets: ['latin']
})

// const bodyFont = Roboto_Flex({
//   subsets: ['latin'],
//   variable: '--font-roboto',
//   display: 'swap'
// })
// const headingFont = Lexend({
//   subsets: ['latin'],
//   variable: '--font-syne',
//   display: 'swap'
// })

export const fonts = {
  heading: globalFont.style.fontFamily,
  body: globalFont.style.fontFamily
}

export default fonts
