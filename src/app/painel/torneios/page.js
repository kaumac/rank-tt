'use client'

import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import React from 'react'

import CreateTournament from '@/components/CreateTournament'
import DashboardHeader from '@/components/DashboardHeader'
import useCurrentOrganization from '@/hooks/useCurrentOrganization'

function Page() {
  const [currentOrganization, loading, error] = useCurrentOrganization()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()

  return (
    <>
      <CreateTournament isOpen={isOpen} onClose={onClose} />
      <DashboardHeader title="Competições" />
      {currentOrganization?.tournaments.length > 0 ? (
        <>
          {currentOrganization?.tournaments.map((tournamentId) => {
            return (
              <Box
                key={tournamentId}
                onClick={() => {
                  router.push(`/painel/torneios/${tournamentId}`)
                }}
              >
                {tournamentId}
              </Box>
            )
          })}
        </>
      ) : (
        <Flex
          flex="1"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Heading size="md" textAlign="center">
            Essa organização ainda não tem competições ativas
          </Heading>
          <Text textAlign="center" my={4}>
            Clique no botão abaixo para criar sua primeira competição
          </Text>
          <Button
            variant="darkBrand"
            fontSize="sm"
            borderRadius="16px"
            w={{ base: '128px', md: '148px' }}
            h="46px"
            onClick={onOpen}
          >
            Criar competição
          </Button>
        </Flex>
      )}
    </>
  )
}

export default Page
