import { Poppins } from 'next/font/google'

const globalFont = Poppins({
  weight: ['400', '600']
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
