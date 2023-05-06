import {
  Heading,
  Text,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot
} from '@chakra-ui/react'

import { useTournamentGroups } from '@/hooks/useTournament'

import CreateGroupButton from './components/CreateGroupButton'
import GroupList from './components/GroupList'

export const PlayersTab = ({ tournament }) => {
  const tournamentData = tournament?.data()
  const [groupsSnapshot, loading, error] = useTournamentGroups(tournament?.id)

  return tournamentData && groupsSnapshot ? (
    <>
      {groupsSnapshot?.docs.length > 0 ? (
        <Box flex="1" p={8}>
          <CreateGroupButton tournament={tournament} />
          {groupsSnapshot.docs.map((groupSnapshot) => {
            const group = groupSnapshot.data()

            return (
              <Box flex="1" p={8}>
                {/* <Heading size="sm">{category.name}</Heading> */}
                <GroupList
                  groups={tournamentData.groups.filter(
                    (group) => group.category === category.name
                  )}
                />
              </Box>
            )
          })}
        </Box>
      ) : (
        <Flex
          flex="1"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <img src="/gifs/decision-making.gif" width="120px" />
          <Heading size="md" color="gray.600" mt={4}>
            Sorteio automático de grupos desativado!
          </Heading>
          <Text
            textAlign="center"
            mb={8}
            mt={2}
            color="gray.600"
            maxWidth="50vw"
          >
            Você pode ativar o sorteio automático de grupos ou criar grupos
            manualmente. Ative o sorteio automático de grupos ou defina grupos
            para todos os jogadores antes de iniciar o torneio.
          </Text>
          <Flex>
            <CreateGroupButton tournament={tournament} />
            <Button borderRadius="100px" colorScheme="brand">
              Ativar sorteio automático de grupos
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  ) : (
    <Flex flex="1" justifyContent="center" alignItems="center">
      <Text>Carregando...</Text>
    </Flex>
  )
}

export default PlayersTab
