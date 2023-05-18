import {
  Avatar,
  Button,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Stack,
  Switch,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { BiTrash } from 'react-icons/bi'

import { useTournamentPlayer } from '@/hooks/useTournament'

const PlayerListItem = ({ playerId }) => {
  const [player, loading, error] = useTournamentPlayer(playerId)
  const playerData = player ? player.data() : null

  return playerData ? (
    <Flex alignItems="center" key={player.id}>
      <Avatar
        size="xs"
        colorScheme="green"
        name={playerData.name}
        src={playerData.photoURL}
      />
      <Text fontSize="sm" color="gray.700" ml={2}>
        {playerData.name}
      </Text>
    </Flex>
  ) : (
    <Flex alignItems="center" key={playerId}>
      ooops
      {playerId}
    </Flex>
  )
}

export const EditGroupPanel = ({ groupId, group }) => {
  const [editMode, setEditMode] = useState(false)
  const groupData = group ? group.data() : null

  return groupData ? (
    <>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading fontSize="lg" color="gray.700">
              Grupo {groupData.number < 10 && '0'}
              {groupData.number}
            </Heading>

            <label htmlFor="email-alerts">
              <Flex alignItems="center">
                <Text
                  fontSize="sm"
                  color={editMode ? 'brand.500' : 'gray.500'}
                  mr={2}
                >
                  Editar
                </Text>
                <Switch
                  isChecked={editMode}
                  value={editMode}
                  id="email-alerts"
                  onChange={(evt) => {
                    setEditMode(!editMode)
                  }}
                />
              </Flex>
            </label>
          </Flex>
        </DrawerHeader>
        <DrawerBody>
          <Stack spacing={2} mt={4}>
            {groupData.players.map((playerId) => (
              <PlayerListItem key={playerId} playerId={playerId} />
            ))}
          </Stack>
          {editMode && (
            <Button
              variant="outline"
              colorScheme="red"
              width="100%"
              leftIcon={<BiTrash fontSize="18px" />}
            >
              Excluir grupo
            </Button>
          )}
        </DrawerBody>
      </DrawerContent>
    </>
  ) : null
}

export default EditGroupPanel
