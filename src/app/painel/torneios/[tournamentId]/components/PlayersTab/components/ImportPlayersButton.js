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
  ModalFooter
} from '@chakra-ui/react'
import { arrayUnion } from 'firebase/firestore'
import { useState } from 'react'

import firebaseUpdateDoc from '@/firebase/updateDoc'

export const ImportPlayersButton = ({ categories, tournamentRef }) => {
  const [listOfPlayers, setListOfPlayers] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log(categories)

  let handleInputChange = (e) => {
    let inputValue = e.target.value
    setListOfPlayers(inputValue)
  }

  const onImportPlayers = () => {
    let parsedPlayers = listOfPlayers.split(/\r?\n/).map((player) => {
      return {
        name: player,
        category: selectedCategory
      }
    })

    firebaseUpdateDoc(tournamentRef, {
      players: arrayUnion(...parsedPlayers)
    })
      .then((response) => {
        console.log('response', response)
      })
      .catch((error) => {
        console.log('error', error)
      })
    console.log(parsedPlayers)
  }

  return (
    categories && (
      <>
        <Button colorScheme="gray" mr={6} onClick={onOpen}>
          Importar lista de atletas
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Importar lista de atletas</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
              <Text mb={4} color="gray.500">
                Insira os nomes dos jogadores que deseja importar. Insira{' '}
                <strong>apenas um nome por linha</strong>.
              </Text>
              <Textarea
                value={listOfPlayers}
                onChange={handleInputChange}
                placeholder="Joaquim José da Silva"
                size="sm"
              />
            </ModalBody>

            <ModalFooter>
              <Button variant="gray" onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="brand" ml={3} onClick={onImportPlayers}>
                Importar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  )
}

export default ImportPlayersButton
