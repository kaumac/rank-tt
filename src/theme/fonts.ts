import { Outfit, Roboto_Flex } from 'next/font/google'

// const globalFont = Manrope({
//   subsets: ['latin']
// })

const bodyFont = Roboto_Flex({
  subsets: ['latin'],
  display: 'swap'
})
const headingFont = Outfit({
  subsets: ['latin'],
  display: 'swap'
})

export const fonts = {
  heading: headingFont.style.fontFamily,
  body: bodyFont.style.fontFamily
}

export default fonts
