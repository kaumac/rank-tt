import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Select,
  ModalFooter,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box
} from '@chakra-ui/react'
import { arrayUnion, collection, query, where } from 'firebase/firestore'
import React, { useState } from 'react'

import firebaseUpdateDoc from '@/firebase/updateDoc'
import { groupCollectionDocsByField } from '@/firebase/utils'
import {
  useTournamentCategories,
  useTournamentGroups,
  useTournamentPlayers
} from '@/hooks/useTournament'

export const CreateGroupWrapper = ({
  children,
  tournament,
  category,
  players
}) => {
  const [newGroup, setNewGroup] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tournamentPlayers, tournamentPlayersLoading, tournamentPlayersError] =
    useTournamentPlayers(tournament?.id)
  const [categories, categoriesLoading, categoriesError] =
    useTournamentCategories(tournament?.id)
  const [tournamentGroups, tournamentGroupsLoading, tournamentGroupsError] =
    useTournamentGroups(tournament?.id)

  categoryId = category?.id

  const playersGroupedByCategory = groupCollectionDocsByField(
    tournamentPlayers,
    'category'
  )

  const groupsGroupedByCategory = groupCollectionDocsByField(
    tournamentGroups,
    'category'
  )

  const handleAddPlayer = (player) => {
    setNewGroup([...newGroup, player])
  }

  const handleRemovePlayer = (player) => {
    setNewGroup(newGroup.filter((p) => p.name !== player.name))
  }

  const onCreateGroup = () => {
    const groupNumber = groupsGroupedByCategory[categoryId]
      ? groupsGroupedByCategory[categoryId].length + 1
      : 1

    console.log('groupNumber', groupNumber)

    // const groupId = `${categoryId}-${groupNumber}`

    // firebaseUpdateDoc(tournament.ref, {
    //   groups: arrayUnion({
    //     name: `Grupo ${groupNumber}`,
    //     players: newGroup,
    //     category: categoryId,
    //     id: groupId
    //   })
    // })
    //   .then((response) => {
    //     newGroup.forEach((player) => {
    //       if (player.type !== 'bye') {
    //         const playerRef = query(
    //           collection(tournament.ref, 'players'),
    //           where('name', '==', player.name)
    //         )
    //         firebaseUpdateDoc(playerRef, {
    //           grupo: groupId
    //         })
    //       }
    //     })
    //   })
    //   .catch((error) => {
    //     console.log('error', error)
    //   })
  }

  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      return React.cloneElement(child, {
        onClick: onOpen
      })
    })
  }

  return (
    <>
      {renderChildren()}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
        <ModalOverlay />
        <ModalContent p={10}>
          <ModalHeader>
            Criar grupo{' '}
            {newGroup.length > 0 && `(${newGroup.length} selecionados)`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflowY="auto" maxHeight="calc(100vh - 280px)">
              <TableContainer width="100%">
                <Table variant="simple">
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th>Adicionar</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {newGroup
                      .filter((newGroupPlayer) => newGroupPlayer.name === 'Bye')
                      .map((player) => (
                        <Tr key={`add-player-list-${player?.id}`}>
                          <Td>{player.name}</Td>
                          <Td>
                            <Button
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => {
                                handleRemovePlayer({ name: 'Bye' })
                              }}
                            >
                              remover
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    {(players || []).map((playerSnapshot) => {
                      const player = playerSnapshot.data()

                      console.log('category player', player)

                      return (
                        <Tr key={player.id}>
                          <Td>{player.name}</Td>
                          <Td>
                            {newGroup.filter(
                              (newGroupPlayer) =>
                                newGroupPlayer.name === player.name
                            ).length === 0 ? (
                              <Button
                                variant="ghost"
                                colorScheme="green"
                                onClick={() => {
                                  handleAddPlayer(player)
                                }}
                              >
                                adicionar
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => {
                                  handleRemovePlayer(player)
                                }}
                              >
                                remover
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              variant="gray"
              onClick={() => {
                handleAddPlayer({ name: 'Bye', type: 'bye' })
              }}
            >
              Adicionar bye
            </Button>
            <Button colorScheme="brand" ml={3} onClick={onCreateGroup}>
              Criar grupo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateGroupWrapper
