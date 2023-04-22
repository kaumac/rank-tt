import {
  Heading,
  Text,
  Center,
  Flex,
  Stack,
  Card,
  Radio
} from '@chakra-ui/react'

import { TOURNAMENT_FORMAT } from '@/constants'

import SetupProgress from './components/SetupProgress'

export const SetupTournament = ({ tournamentData }) => {
  console.log(TOURNAMENT_FORMAT)
  const completedSteps = {
    tournamentFormat: !!tournamentData?.format,
    tournamentCategories:
      tournamentData?.format === TOURNAMENT_FORMAT.NO_CATEGORIES ||
      tournamentData?.categories.length > 0,
    tournamentGroups:
      Object.keys(tournamentData?.settings?.groups || {}).length > 0,
    tournamentGames:
      Object.keys(tournamentData?.settings?.games || {}).length > 0,
    tournamentTables: tournamentData?.tables.length > 0
  }

  return (
    <Flex flex="1">
      <SetupProgress completedSteps={completedSteps} />
      <Center flex="1" flexDirection="column" p={8}>
        <Heading size="md" color="gray.600">
          Selecione o formato do seu torneio
        </Heading>
        <Text color="gray.500">
          <strong>Importante</strong>: Uma vez definido o formato do torneio,
          não será possível alterá-lo!
        </Text>
        <Stack spacing={4} mt={8}>
          <Card px={8} py={4} opacity={0.5} pointerEvents="none">
            <Flex alignItems="center">
              <Radio size="lg" colorScheme="orange" isChecked={false} mr={4} />
              <Heading size="sm" color="gray.600">
                Sem categorização
              </Heading>
            </Flex>
          </Card>
          <Card px={8} py={4} opacity={0.5} pointerEvents="none">
            <Flex alignItems="center">
              <Radio size="lg" colorScheme="orange" isChecked={false} mr={4} />
              <Heading size="sm" color="gray.600">
                Organizar por categoria
              </Heading>
            </Flex>
          </Card>
          <Card px={8} py={4} cursor="pointer">
            <Flex alignItems="center">
              <Radio size="lg" colorScheme="orange" isChecked={false} mr={4} />
              <Heading size="sm" color="gray.600">
                Organizar por categoria e sub-categoria
              </Heading>
            </Flex>
          </Card>
        </Stack>
      </Center>
    </Flex>
  )
}

export default SetupTournament
