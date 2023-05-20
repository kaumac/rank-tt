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
  Text,
  Tag
} from '@chakra-ui/react'
import { collection, doc, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { BiTrash, BiPlus } from 'react-icons/bi'

import { pushDoc } from '@/firebase'
import { groupCollectionDocsByField } from '@/firebase/utils'
import { useTournamentGroups } from '@/hooks/useTournament'

export const CreateGroupWrapper = ({
  children,
  tournament,
  category,
  categoryPlayers,
  categoryGroups
}) => {
  const [newGroup, setNewGroup] = useState({ players: [] })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const categoryId = category?.id

  const unassignedPlayers = (categoryPlayers?.docs || []).filter((categoryPlayer) => {
    const categoryPlayerData = categoryPlayer.data()

    return (
      !categoryPlayerData.group &&
      !newGroup.players.find((newGroupPlayer) => newGroupPlayer === categoryPlayer.id)
    )
  })

  const handleAddPlayer = (playerId) => {
    setNewGroup({
      ...newGroup,
      players: [...newGroup.players, playerId]
    })
  }

  const handleRemovePlayer = (playerToBeRemoved) => {
    setNewGroup({
      ...newGroup,
      players: newGroup.players.filter((newGroupPlayer) => newGroupPlayer !== playerToBeRemoved)
    })
  }

  const handleToggleBye = () => {
    setNewGroup({
      ...newGroup,
      hasBye: !newGroup.hasBye
    })
  }

  const handleOnClose = () => {
    setNewGroup({ ...newGroup, players: [] })
    onClose()
  }

  const onCreateGroup = async () => {
    if (!tournament || !categoryId) return

    const groupsRef = collection(tournament.ref, 'groups')

    console.log

    await pushDoc(groupsRef, newGroup).then(async (createdGroup) => {
      for await (const playerId of newGroup.players) {
        if (playerId === 'bye') continue

        const playerRef = doc(tournament.ref, 'players', playerId)

        updateDoc(playerRef, {
          group: createdGroup.id,
          groupNumber: newGroup.number
        })
      }
    })

    handleOnClose()
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
      number: categoryGroups?.docs.length + 1,
      category: category?.id
    })
  }, [categoryGroups, category])

  return (
    <>
      {renderChildren()}
      <Modal isOpen={isOpen} onClose={handleOnClose} isCentered size="xl">
        <ModalOverlay />
        <ModalContent p={4} maxWidth="80vw">
          <ModalHeader>
            Criar grupo {newGroup.length > 0 && `(${newGroup.length} selecionados)`}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody px={0}>
            <Flex>
              <Box pl={6} pr={8} width="50%">
                <Card p={4}>
                  <Flex alignItems="center" mb={8}>
                    <Heading color="gray.700" size="md">
                      Grupo {newGroup.number}
                    </Heading>
                    {newGroup.hasBye && (
                      <Tag ml={4} colorScheme="brand">
                        Bye
                      </Tag>
                    )}
                  </Flex>
                  {newGroup.players.length > 0 ? (
                    <TableContainer width="100%">
                      <Table variant="simple">
                        <Tbody>
                          {newGroup.players.map((newGroupPlayer, newGroupPlayerIndex) => {
                            const player = (categoryPlayers?.docs || []).find(
                              (categoryPlayer) => categoryPlayer.id === newGroupPlayer
                            )

                            if (!player) return null

                            const playerData = player.data()

                            return (
                              <Tr key={`group-player-list-${newGroupPlayerIndex}`}>
                                <Td
                                  position="relative"
                                  data-group
                                  borderBottom={
                                    newGroupPlayerIndex + 1 === newGroup.players.length
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
                                    <Button colorScheme="red" leftIcon={<BiTrash />}>
                                      Remover do grupo
                                    </Button>
                                  </Center>
                                </Td>
                              </Tr>
                            )
                          })}
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
                                <Button leftIcon={<BiPlus />}>Adicionar ao grupo</Button>
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
            <Button variant="ghost" onClick={handleOnClose} color="red">
              Cancelar
            </Button>
            <Button variant="ghost" onClick={handleToggleBye}>
              {!newGroup.hasBye ? 'Adicionar bye' : 'Remover bye'}
            </Button>
            <Button ml={3} onClick={onCreateGroup} colorScheme="black">
              Criar grupo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateGroupWrapper
