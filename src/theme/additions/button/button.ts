const Button = {
  baseStyle: (props: any) => ({
    borderRadius: 'sm'
  }),
  variants: {
    solid: (props: any) => ({
      colorScheme: 'black'
    }),
    ghost: (props: any) => ({
      colorScheme: 'brand'
    }),
    outline: (props: any) => ({
      colorScheme: 'brand',
      borderRadius: 'sm'
    })
  },
  defaultProps: {
    colorScheme: 'black'
  }
}

export const ButtonComponent = {
  components: {
    Button
  }
}
