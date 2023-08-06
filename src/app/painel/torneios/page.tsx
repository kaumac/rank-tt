'use client'

import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { BiPlus } from 'react-icons/bi'

import useCurrentOrganizationTournaments from '@/queries/useCurrentOrganizationTournaments'

function Page() {
  const {
    data: currentOrganizationTournaments,
    isLoading: isCurrentOrganizationTournamentsLoading,
    error: currentOrganizationTournamentsError
  } = useCurrentOrganizationTournaments()

  console.log(currentOrganizationTournaments)

  return currentOrganizationTournaments && currentOrganizationTournaments.length > 0 ? (
    <Box>
      {currentOrganizationTournaments.map((tournament) => (
        <Box key={tournament.id}>{tournament.name}</Box>
      ))}
    </Box>
  ) : (
    <Flex
      flex="1"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundImage="linear-gradient(to right, #FFF8FC, #F3F9FF)"
      borderRadius="xxl"
    >
      <Heading
        size="lg"
        fontWeight={600}
        backgroundClip="text"
        backgroundImage="linear-gradient(to right, rgb(236, 0, 140), rgb(0, 112, 243))"
        letterSpacing="-0.04rem"
      >
        Crie o seu primeiro torneio
      </Heading>
      <Text
        fontSize="lg"
        letterSpacing="-0.02rem"
        textAlign="center"
        lineHeight="1.8rem"
        mt={4}
        color="gray.700"
      >
        Parece que você não tem nenhum torneio cadastrado ainda...
        <br />
        Vamos começar? É só clicar no botão abaixo!
      </Text>
      <Button mt={8} colorScheme="black" borderRadius="full" size="lg" leftIcon={<BiPlus />}>
        Criar torneio
      </Button>
    </Flex>
  )
}

export default Page
