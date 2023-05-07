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
import { useTournamentGroups } from '@/hooks/useTournament'

export const CreateGroupWrapper = ({
  children,
  tournament,
  category,
  players
}) => {
  const [newGroup, setNewGroup] = useState({ players: [] })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tournamentGroups, tournamentGroupsLoading, tournamentGroupsError] =
    useTournamentGroups(tournament?.id)

  categoryId = category?.id

  const groupsGroupedByCategory = groupCollectionDocsByField(
    tournamentGroups,
    'category'
  )

  const categoryGroups = groupsGroupedByCategory[categoryId]

  console.log({ categoryGroups })

  const groupNumber = categoryGroups ? categoryGroups.length + 1 : 1

  const handleAddPlayer = (playerId) => {
    setNewGroup({
      ...newGroup,
      players: [...newGroup.players, playerId]
    })
  }

  const handleRemovePlayer = (playerId) => {
    setNewGroup({
      ...newGroup,
      players: newGroup.players.filter((player) => player !== playerId)
    })
  }

  const onCreateGroup = () => {
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

  console.log({ newGroup })

  return (
    <>
      {renderChildren()}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent p={4}>
          <ModalHeader>
            Criar grupo{' '}
            {newGroup.length > 0 && `(${newGroup.length} selecionados)`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={0}>
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
                    {newGroup.players
                      .filter((newGroupPlayer) => newGroupPlayer === 'bye')
                      .map((bye, byeIndex) => (
                        <Tr key={`group-bye-list-${byeIndex}`}>
                          <Td>Bye</Td>
                          <Td>
                            <Button
                              variant="ghost"
                              colorScheme="red"
                              onClick={() => {
                                handleRemovePlayer('bye')
                              }}
                            >
                              remover
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    {(players || []).map((player) => {
                      const playerData = player.data()

                      return (
                        <Tr key={player.id}>
                          <Td>{playerData.name}</Td>
                          <Td>
                            {newGroup.players.includes(player.id) ? (
                              <Button
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => {
                                  handleRemovePlayer(player.id)
                                }}
                              >
                                remover
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                colorScheme="green"
                                onClick={() => {
                                  handleAddPlayer(player.id)
                                }}
                              >
                                adicionar
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
            <Button variant="ghost" onClick={onClose} color="red">
              Cancelar
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                handleAddPlayer('bye')
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
