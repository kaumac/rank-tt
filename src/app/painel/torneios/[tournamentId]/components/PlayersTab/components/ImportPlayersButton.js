import {
  Text,
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
  Box,
  Td,
  Icon,
  Tag
} from '@chakra-ui/react'
import { collection } from 'firebase/firestore'
import { useState } from 'react'
import { BiCheck, BiError } from 'react-icons/bi'
import { format } from 'telefone'

import { pushDoc, updateDoc } from '@/firebase'

const importStatusLabelMap = {
  ready: {
    label: 'Pronto para importar',
    icon: BiCheck,
    color: 'gray'
  },
  imported: {
    label: 'Importado',
    icon: BiCheck,
    color: 'green'
  },
  error: {
    label: 'Erro',
    icon: BiError,
    color: 'red'
  }
}

export const ImportPlayersButton = ({ categories, tournamentRef }) => {
  const [playersToImportInput, setPlayersToImportInput] = useState('')
  const [playersToImport, setPlayersToImport] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log(categories)

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setPlayersToImportInput(inputValue)
  }

  const onPrepareToImport = () => {
    let parsedPlayers = playersToImportInput.split(/\r?\n/).map((player) => {
      let playerData = player.split(',')
      return {
        name: playerData[0],
        phoneNumber: (playerData[1] || '').replace(/[^A-Z0-9]/gi, '_'),
        category: selectedCategory
      }
    })

    setPlayersToImport(parsedPlayers)
  }

  const onImportPlayers = async () => {
    const playersCollectionRef = collection(tournamentRef, 'players')

    playersToImport.forEach(async (player, playerIndex) => {
      pushDoc(playersCollectionRef, player).then((importedPlayerDocRef) => {
        updateDoc(importedPlayerDocRef, { id: importedPlayerDocRef.id }).then(
          () => {
            const newPlayersToImport = [...playersToImport]
            newPlayersToImport[playerIndex] = {
              ...player,
              status: 'imported'
            }
            setPlayersToImport(newPlayersToImport)

            console.log('playersToImport', playersToImport)
          }
        )

        return importedPlayerDocRef
      })
    })
  }

  return (
    categories && (
      <>
        <Button colorScheme="gray" mr={6} onClick={onOpen}>
          Importar lista de jogadores
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Importar lista de jogadores</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {!selectedCategory && (
                <FormControl mb={4}>
                  <FormLabel>
                    <strong>Para qual categoria deseja importar?</strong>
                  </FormLabel>
                  <Select
                    placeholder="Selecione a categoria"
                    onChange={(val) => {
                      setSelectedCategory(val.target.value)
                    }}
                  >
                    {categories.map((category) => (
                      <option key={category.name}>{category.name}</option>
                    ))}
                  </Select>
                </FormControl>
              )}
              {!!selectedCategory && playersToImport.length === 0 && (
                <>
                  <Text mb={4} color="gray.600  ">
                    <strong>{selectedCategory}</strong>
                  </Text>
                  <Text mb={4} color="gray.500">
                    Insira os nomes dos jogadores que deseja importar.
                    <br />* Insira <strong>apenas um nome por linha</strong>
                    .
                    <br />
                    ** <strong>Opcionalmente</strong> você pode inserir um
                    número de celular separado por vírgula para cada jogador.
                  </Text>
                  <Textarea
                    value={playersToImportInput}
                    onChange={handleInputChange}
                    placeholder="Joaquim José da Silva"
                    size="sm"
                  />
                </>
              )}
              {!!selectedCategory && playersToImport.length > 0 && (
                <Box overflowY="auto" maxHeight="calc(100vh - 280px)">
                  <TableContainer width="100%">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Nome</Th>
                          <Th>Celular</Th>
                          <Th>Status</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {playersToImport.map((player, playerIndex) => (
                          <Tr key={`player-to-import-${playerIndex}`}>
                            <Td>{player.name}</Td>
                            <Td>{format(player.phoneNumber)}</Td>
                            <Td>
                              <Tag
                                size="lg"
                                colorScheme={
                                  importStatusLabelMap[player.status]?.color ||
                                  importStatusLabelMap['ready'].color
                                }
                                borderRadius="full"
                              >
                                <Icon
                                  as={
                                    importStatusLabelMap[player.status]?.icon ||
                                    importStatusLabelMap['ready'].icon
                                  }
                                  color={
                                    importStatusLabelMap[player.status]
                                      ?.color ||
                                    importStatusLabelMap['ready'].color
                                  }
                                  mr={2}
                                />
                                {importStatusLabelMap[player.status]?.label ||
                                  importStatusLabelMap['ready'].label}
                              </Tag>
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
              <Button variant="gray" onClick={onClose}>
                Cancelar
              </Button>
              {!!selectedCategory && playersToImport.length === 0 && (
                <Button colorScheme="brand" ml={3} onClick={onPrepareToImport}>
                  Continuar
                </Button>
              )}
              {!!selectedCategory && playersToImport.length > 0 && (
                <Button colorScheme="brand" ml={3} onClick={onImportPlayers}>
                  Importar todos
                </Button>
              )}
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  )
}

export default ImportPlayersButton
