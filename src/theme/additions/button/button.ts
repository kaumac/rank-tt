const Button = {
  baseStyle: (props: any) => ({
    borderRadius: 'sm'
  }),
  variants: {
    ghost: (props: any) => ({
      colorScheme: 'brand'
    }),
    outline: (props: any) => ({
      colorScheme: 'brand'
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
