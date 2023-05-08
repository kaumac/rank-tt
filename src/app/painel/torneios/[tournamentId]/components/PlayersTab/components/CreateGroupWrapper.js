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
  Box,
  Flex,
  Center,
  Card,
  Heading,
  Text,
  Divider
} from '@chakra-ui/react'
import { arrayUnion, collection, query, where } from 'firebase/firestore'
import React, { useState } from 'react'
import { BiTrash, BiPlus } from 'react-icons/bi'

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

  const unassignedPlayers = players.filter(
    (player) =>
      !player.group &&
      !newGroup.players.find((newGroupPlayer) => newGroupPlayer === player.id)
  )

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
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent p={4} maxWidth="80vw">
          <ModalHeader>
            Criar grupo{' '}
            {newGroup.length > 0 && `(${newGroup.length} selecionados)`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={0}>
            <Flex>
              <Box pl={6} pr={8} minWidth="50%">
                <Text color="gray.500" mb={2}>
                  Selecione os jogadores na lista para criar um novo grupo
                </Text>
                <Card p={4}>
                  <Heading color="gray.700" size="md" mb={8}>
                    Grupo 01
                  </Heading>
                  <TableContainer width="100%">
                    <Table variant="simple">
                      <Tbody>
                        {newGroup.players.map(
                          (newGroupPlayer, newGroupPlayerIndex) => {
                            playerData = players
                              .find((player) => player.id === newGroupPlayer)
                              .data()

                            console.log(playerData)

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
                              >
                                <Button
                                  leftIcon={<BiPlus />}
                                  onClick={() => {
                                    handleAddPlayer(player.id)
                                  }}
                                >
                                  Adicionar ao grupo
                                </Button>
                              </Center>
                            </Td>
                            {/* <Td>
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
                                  
                                >
                                  adicionar
                                </Button>
                              )}
                            </Td> */}
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
