import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  TableContainer,
  Table,
  Tr,
  Tbody,
  Td,
  Box,
  Flex,
  Center,
  Card,
  Heading,
  Text
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiTrash, BiPlus } from 'react-icons/bi'

import { groupCollectionDocsByField } from '@/firebase/utils'
import { useTournamentGroups } from '@/hooks/useTournament'

export const CreateGroupWrapper = ({
  children,
  tournament,
  category,
  players = []
}) => {
  const [newGroup, setNewGroup] = useState({ players: [] })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tournamentGroups, tournamentGroupsLoading, tournamentGroupsError] =
    useTournamentGroups(tournament?.id)

  const categoryId = category?.id

  const groupsGroupedByCategory = groupCollectionDocsByField(
    tournamentGroups,
    'category'
  )

  const categoryGroups = groupsGroupedByCategory[categoryId] || []

  const unassignedPlayers = players.filter(
    (player) =>
      !player.group &&
      !newGroup.players.find((newGroupPlayer) => newGroupPlayer === player.id)
  )

  const groupNumber = categoryGroups.length + 1

  const handleAddPlayer = (playerId) => {
    setNewGroup({
      ...newGroup,
      players: [...newGroup.players, playerId]
    })
  }

  const handleRemovePlayer = (playerToBeRemoved) => {
    setNewGroup({
      ...newGroup,
      players: newGroup.players.filter(
        (newGroupPlayer) => newGroupPlayer !== playerToBeRemoved
      )
    })
  }

  const handleOnClose = () => {
    setNewGroup({ players: [] })
    onClose()
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

  useEffect(() => {
    setNewGroup({
      ...newGroup,
      number: groupNumber
    })
  }, [groupNumber])

  return (
    <>
      {renderChildren()}
      <Modal isOpen={isOpen} onClose={handleOnClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent p={4} maxWidth="80vw">
          <ModalHeader>
            Criar grupo{' '}
            {newGroup.length > 0 && `(${newGroup.length} selecionados)`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={0}>
            <Flex>
              <Box pl={6} pr={8} width="50%">
                <Card p={4}>
                  <Heading color="gray.700" size="md" mb={8}>
                    Grupo {newGroup.number}
                  </Heading>
                  {newGroup.players.length > 0 ? (
                    <TableContainer width="100%">
                      <Table variant="simple">
                        <Tbody>
                          {newGroup.players.map(
                            (newGroupPlayer, newGroupPlayerIndex) => {
                              const player = players.find(
                                (player) => player.id === newGroupPlayer
                              )

                              if (!player) return null

                              const playerData = player.data()

                              return (
                                <Tr
                                  key={`group-player-list-${newGroupPlayerIndex}`}
                                >
                                  <Td
                                    position="relative"
                                    data-group
                                    borderBottom={
                                      newGroupPlayerIndex + 1 ===
                                      newGroup.players.length
                                        ? 'none'
                                        : null
                                    }
                                  >
                                    {playerData?.name}
                                    <Center
                                      width="100%"
                                      height="100%"
                                      position="absolute"
                                      top="0"
                                      left="0"
                                      cursor="pointer"
                                      opacity="0"
                                      transition="opacity 0.2s ease-in-out"
                                      _groupHover={{
                                        bg: 'rgba(201, 41, 31, 0.04)',
                                        opacity: 1
                                      }}
                                      onClick={() => {
                                        handleRemovePlayer(newGroupPlayer)
                                      }}
                                    >
                                      <Button
                                        colorScheme="red"
                                        leftIcon={<BiTrash />}
                                      >
                                        Remover do grupo
                                      </Button>
                                    </Center>
                                  </Td>
                                </Tr>
                              )
                            }
                          )}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  ) : (
                    <Center width="100%">
                      <Text color="gray.500" p={4} textAlign="center">
                        Selecione os jogadores na lista para criar um novo grupo
                      </Text>
                    </Center>
                  )}
                </Card>
              </Box>
              <Box overflowY="auto" maxHeight="calc(100vh - 280px)" flex="1">
                <TableContainer width="100%">
                  <Table variant="simple">
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
                      {(unassignedPlayers || []).map((player) => {
                        const playerData = player.data()

                        return (
                          <Tr key={player.id}>
                            <Td position="relative" data-group>
                              {playerData.name}
                              <Center
                                width="100%"
                                height="100%"
                                position="absolute"
                                top="0"
                                left="0"
                                cursor="pointer"
                                opacity="0"
                                transition="opacity 0.2s ease-in-out"
                                _groupHover={{
                                  bg: 'rgba(85, 31, 201, 0.04)',
                                  opacity: 1
                                }}
                                onClick={() => {
                                  handleAddPlayer(player.id)
                                }}
                              >
                                <Button leftIcon={<BiPlus />}>
                                  Adicionar ao grupo
                                </Button>
                              </Center>
                            </Td>
                          </Tr>
                        )
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </Flex>
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
