import {
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack
} from '@chakra-ui/react'
import { FunctionComponent } from 'react'

interface HeroSectionProps {}

export const HeroSection: FunctionComponent<HeroSectionProps> = () => {
  return (
    <Container maxW="container.lg">
      <Center p={4} minHeight="70vh">
        <VStack>
          <Container maxW="container.md" textAlign="center">
            <Heading size="2xl" mb={4} color="gray.700">
              Uma única plataforma que une várias competições de tenis de mesa
            </Heading>

            <Text fontSize="xl" color="gray.500">
              Se increva em competições, acompanhe seus jogos e resultados
              anteriores.
            </Text>

            <Button
              mt={8}
              colorScheme="brand"
              onClick={() => {
                window.open('https://launchman.cc', '_blank')
              }}
            >
              Criar conta de atleta
            </Button>

            <Text my={2} fontSize="sm" color="gray.500">
              100% grátis!
            </Text>
          </Container>
        </VStack>
      </Center>
    </Container>
  )
}
