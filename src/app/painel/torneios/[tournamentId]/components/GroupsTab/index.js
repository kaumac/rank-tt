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
    <Box flex="1" flexDirection="column">
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
    <Flex flex="1" justifyContent="center" alignItems="center">
      <Text>Carregando...</Text>
    </Flex>
  )
}

export default PlayersTab
