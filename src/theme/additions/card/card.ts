import { cardAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    backgroundColor: '#FFFFFF',
    padding: 6
  }
  // header: {
  //   paddingBottom: '2px'
  // },
  // body: {
  //   paddingTop: '2px'
  // },
  // footer: {
  //   paddingTop: '2px'
  // }
})

const sizes = {
  // md: definePartsStyle({
  //   container: {
  //     borderRadius: '0px'
  //   }
  // })
}

export const cardTheme = defineMultiStyleConfig({ baseStyle, sizes })

export const NewCard = {
  components: {
    Card: cardTheme
  }
}
