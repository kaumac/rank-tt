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
import { BiCheck, BiError, BiGridAlt, BiUserPlus } from 'react-icons/bi'
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

export const ImportPlayersButton = ({ category, tournamentRef }) => {
  const [isImportComplete, setIsImportComplete] = useState(false)
  const [playersToImportInput, setPlayersToImportInput] = useState('')
  const [playersToImport, setPlayersToImport] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

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
        category: category.id
      }
    })

    setPlayersToImport(parsedPlayers)
  }

  const onImportPlayers = async () => {
    const playersCollectionRef = collection(tournamentRef, 'players')

    playersToImport.forEach(async (player, playerIndex) => {
      pushDoc(playersCollectionRef, player).then(() => {
        const newPlayersToImport = [...playersToImport]
        newPlayersToImport[playerIndex] = {
          ...player,
          status: 'imported'
        }
        setPlayersToImport(newPlayersToImport)
        setIsImportComplete(true)
      })
    })
  }

  return (
    <>
      <Button
        colorScheme="brand"
        size="sm"
        leftIcon={<BiUserPlus fontSize="22px" />}
        onClick={onOpen}
      >
        Importar jogadores
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setIsImportComplete(false)
          setPlayersToImportInput('')
          setPlayersToImport([])
        }}
        isCentered
        size="xl"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Importar jogadores
            {category && ` (Categoria ${category.data().name}`})
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {playersToImport.length === 0 && (
              <>
                <Text mb={4} color="gray.500">
                  Insira os nomes dos jogadores que deseja importar.
                  <br />* Insira <strong>apenas um nome por linha</strong>
                  .
                  <br />
                  ** <strong>Opcionalmente</strong> você pode inserir um número
                  de celular separado por vírgula para cada jogador.
                </Text>
                <Textarea
                  value={playersToImportInput}
                  onChange={handleInputChange}
                  placeholder="Joaquim José da Silva"
                  size="sm"
                />
              </>
            )}
            {playersToImport.length > 0 && (
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
                                  importStatusLabelMap[player.status]?.color ||
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
            {playersToImport.length === 0 && !isImportComplete && (
              <Button colorScheme="brand" ml={3} onClick={onPrepareToImport}>
                Continuar
              </Button>
            )}
            {playersToImport.length > 0 && !isImportComplete && (
              <Button colorScheme="brand" ml={3} onClick={onImportPlayers}>
                Importar todos
              </Button>
            )}
            {isImportComplete && (
              <Button
                colorScheme="brand"
                ml={3}
                onClick={() => {
                  onClose()
                  setIsImportComplete(false)
                  setPlayersToImportInput('')
                  setPlayersToImport([])
                }}
              >
                Concluir
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ImportPlayersButton
