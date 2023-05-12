import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'

import { ButtonComponent } from './additions/button/button'
import { NewCard } from './additions/card/card'
import { badgeStyles } from './components/badge'
import { buttonStyles } from './components/button'
import { inputStyles } from './components/input'
import { linkStyles } from './components/link'
import { progressStyles } from './components/progress'
import { sliderStyles } from './components/slider'
import { switchStyles } from './components/switch'
import { textareaStyles } from './components/textarea'
import { breakpoints } from './foundations/breakpoints'
import { globalStyles } from './styles'

export default extendTheme(
  { breakpoints }, // Breakpoints
  globalStyles,
  badgeStyles, // badge styles
  buttonStyles, // button styles
  linkStyles, // link styles
  progressStyles, // progress styles
  sliderStyles, // slider styles
  inputStyles, // input styles
  textareaStyles, // textarea styles
  switchStyles, // switch styles
  NewCard, // card component
  ButtonComponent, // card component
  withDefaultColorScheme({ colorScheme: 'brand' })
)
