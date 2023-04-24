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

import CreateGroupButton from './components/CreateGroupButton'
import GroupList from './components/GroupList'

export const PlayersTab = ({ tournament }) => {
  const tournamentData = tournament?.data()

  return (
    <Box flex="1" flexDirection="column">
      <CreateGroupButton tournament={tournament} />
      {tournamentData?.categories.map((category) => (
        <Box flex="1" p={8}>
          <Heading size="sm">{category.name}</Heading>
          <GroupList
            groups={tournamentData.groups.filter(
              (group) => group.category === category.name
            )}
          />
        </Box>
      ))}
    </Box>
  )
}

export default PlayersTab
