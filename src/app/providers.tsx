'use client'

import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { FirebaseAppProvider } from 'reactfire'

import { config } from '@/firebase'
import theme from '@/theme/theme'

function Providers({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } })
  )

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={client}>
        <FirebaseAppProvider firebaseConfig={config}>{children}</FirebaseAppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChakraProvider>
  )
}

export default Providers
