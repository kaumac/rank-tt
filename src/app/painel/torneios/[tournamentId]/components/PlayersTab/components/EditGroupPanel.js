import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  ListItem,
  Stack,
  Switch,
  Text,
  UnorderedList,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { BiTrash } from 'react-icons/bi'

import { useTournamentPlayer, useQueueTournamentGroupDeletion } from '@/hooks/useTournament'

const PlayerListItem = ({ playerId }) => {
  const [player, loading, error] = useTournamentPlayer(playerId)

  const playerData = player ? player.data() : null

  return playerData ? (
    <Flex alignItems="center" key={player.id}>
      <Avatar size="xs" colorScheme="green" name={playerData.name} src={playerData.photoURL} />
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

export const EditGroupPanel = ({ onClose, tournamentId, groupId, group }) => {
  const [editMode, setEditMode] = useState(false)
  const cancelDeleteGroupRef = useRef()
  const {
    isOpen: isDeleteGroupAlertOpen,
    onOpen: onDeleteGroupAlertOpen,
    onClose: onDeleteGroupAlertClose
  } = useDisclosure()

  const {
    mutate: mutateDeleteTournamentGroup,
    isLoading: isDeletingTournamentGroup,
    error: deleteTournamentGroupError,
    isDone: isTournamentGroupDeleted
  } = useQueueTournamentGroupDeletion(tournamentId, groupId)

  const handleGroupDeletion = async () => {
    await mutateDeleteTournamentGroup()
  }

  const groupData = group ? group.data() : null

  useEffect(() => {
    if (isDeletingTournamentGroup) {
      onDeleteGroupAlertClose()
    }
    if (isTournamentGroupDeleted) {
      onClose()
    }

    console.log({ isDeletingTournamentGroup })
    console.log({ isTournamentGroupDeleted })
  }, [isDeletingTournamentGroup, isTournamentGroupDeleted])

  return (
    <>
      <DrawerOverlay backdropFilter="blur(6px)" bg="rgba(255,255,255,0.5)" />
      <DrawerContent
        boxShadow="0 0 140px 0 rgba(0,0,0,0.1), 0 0 20px 0 rgba(0,0,0,0.05)"
        borderLeft="1px solid"
        borderColor="gray.200"
      >
        <DrawerHeader borderBottomWidth="1px">
          {!(isDeletingTournamentGroup || isTournamentGroupDeleted) && groupData ? (
            <Flex justifyContent="space-between" alignItems="center">
              <Heading fontSize="lg" color="gray.700">
                Grupo {groupData.number < 10 && '0'}
                {groupData.number}
              </Heading>

              <label htmlFor={`toggle-group-${groupId}-edit`}>
                <Flex alignItems="center">
                  <Text fontSize="sm" color={editMode ? 'brand.500' : 'gray.500'} mr={2}>
                    Editar
                  </Text>
                  <Switch
                    isChecked={editMode}
                    value={editMode}
                    id={`toggle-group-${groupId}-edit`}
                    onChange={(evt) => {
                      setEditMode(!editMode)
                    }}
                  />
                </Flex>
              </label>
            </Flex>
          ) : (
            <Flex justifyContent="space-between" alignItems="center">
              <Heading fontSize="lg" color="gray.700">
                Deletando grupo...
              </Heading>
            </Flex>
          )}
        </DrawerHeader>
        <DrawerBody>
          {!(isDeletingTournamentGroup || isTournamentGroupDeleted) && groupData && (
            <>
              <Stack spacing={2} mt={4}>
                {groupData.players.map((playerId) => (
                  <PlayerListItem key={playerId} playerId={playerId} />
                ))}
              </Stack>
              {editMode && (
                <>
                  <Button
                    variant="outline"
                    colorScheme="red"
                    width="100%"
                    leftIcon={<BiTrash fontSize="18px" />}
                    onClick={onDeleteGroupAlertOpen}
                  >
                    Excluir grupo
                  </Button>
                  <AlertDialog
                    motionPreset="slideInBottom"
                    leastDestructiveRef={cancelDeleteGroupRef}
                    onClose={onDeleteGroupAlertClose}
                    isOpen={isDeleteGroupAlertOpen}
                    isCentered
                    size="xl"
                  >
                    <AlertDialogOverlay />

                    <AlertDialogContent>
                      <AlertDialogHeader>Tem certeza?</AlertDialogHeader>
                      <AlertDialogCloseButton />
                      <AlertDialogBody>
                        Você está prestes a <strong>excluir o grupo {groupData.number}</strong>.
                        Esta ação será irreverssível!
                        <UnorderedList spacing={1} mt={4}>
                          <ListItem color="gray.600">
                            O grupo {groupData.number} será permanentemente excluído.
                          </ListItem>
                          <ListItem color="gray.600">
                            Todos os jogadores do grupo {groupData.number} ficarão sem grupo e
                            poderão ser adicionados à um novo grupo.
                          </ListItem>
                          <ListItem color="gray.600">
                            O número dos grupos seguintes ao grupo {groupData.number} serão
                            alterados.
                          </ListItem>
                        </UnorderedList>
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button
                          ref={cancelDeleteGroupRef}
                          onClick={onDeleteGroupAlertClose}
                          colorScheme="black"
                        >
                          Cancelar
                        </Button>
                        <Button
                          colorScheme="red"
                          ml={3}
                          variant="ghost"
                          onClick={handleGroupDeletion}
                        >
                          Confirmar exclusão
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </>
  )
}

export default (props) => (
  <Drawer placement="right" size="sm" isOpen={props.isOpen} onClose={props.onClose}>
    <EditGroupPanel {...props} />
  </Drawer>
)
