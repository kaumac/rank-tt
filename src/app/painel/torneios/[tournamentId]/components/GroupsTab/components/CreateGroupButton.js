import {
  Heading,
  Text,
  Flex,
  Stack,
  Card,
  Radio,
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
  Textarea,
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
import { arrayUnion, collection, doc, query, where } from 'firebase/firestore'
import { useState } from 'react'

import firebaseUpdateDoc from '@/firebase/updateDoc'

export const CreateGroupButton = ({ tournament }) => {
  const [newGroup, setNewGroup] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const tournamentData = tournament?.data()

  const handleAddPlayer = (player) => {
    setNewGroup([...newGroup, player])
  }

  const handleRemovePlayer = (player) => {
    setNewGroup(newGroup.filter((p) => p.name !== player.name))
  }

  const onCreateGroup = () => {
    const groupNumber =
      tournamentData.groups.filter((group) => {
        return group.category === selectedCategory
      }).length + 1

    const groupId = `${selectedCategory}-${groupNumber}`

    firebaseUpdateDoc(tournament.ref, {
      groups: arrayUnion({
        name: `Grupo ${groupNumber}`,
        players: newGroup,
        category: selectedCategory,
        id: groupId
      })
    })
      .then((response) => {
        console.log('newGroup', newGroup)
        newGroup.forEach((player) => {
          console.log('newGroup', player)
          if (player.type !== 'bye') {
            console.log('player', player)
            const playerRef = query(
              collection(tournament.ref, 'players'),
              where('name', '==', player.name)
            )
            firebaseUpdateDoc(playerRef, {
              grupo: groupId
            })
          }
        })
        console.log('response', response)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  return (
    tournamentData && (
      <>
        <Button colorScheme="gray" mr={6} onClick={onOpen}>
          Criar grupo
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="full">
          <ModalOverlay />
          <ModalContent p={10}>
            <ModalHeader>
              Criar grupo{' '}
              {newGroup.length > 0 && `(${newGroup.length} selecionados)`}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {!selectedCategory && (
                <FormControl mb={4}>
                  <FormLabel>
                    <strong>Em qual categoria?</strong>
                  </FormLabel>
                  <Select
                    placeholder="Selecione a categoria"
                    onChange={(val) => {
                      setSelectedCategory(val.target.value)
                    }}
                  >
                    {tournamentData.categories.map((category) => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </Select>
                </FormControl>
              )}
              {selectedCategory && (
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
                          .filter(
                            (newGroupPlayer) => newGroupPlayer.name === 'Bye'
                          )
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
                        {tournamentData.players
                          .filter(
                            (player) => player.category === selectedCategory
                          )
                          .map((player) => (
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
                          ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
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
  )
}

export default CreateGroupButton
