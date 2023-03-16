'use client'

import { Button, ButtonProps } from '@chakra-ui/react'
import Link, { LinkProps } from 'next/link'

type ChakraAndNextProps = ButtonProps & LinkProps

export default function LinkButton({
  href,
  children,
  prefetch = true,
  ...props
}: ChakraAndNextProps) {
  return (
    <Link href={href} passHref prefetch={prefetch}>
      <Button {...props}>{children}</Button>
    </Link>
  )
}
