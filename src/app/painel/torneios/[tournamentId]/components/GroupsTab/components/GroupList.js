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
  SimpleGrid
} from '@chakra-ui/react'
import { arrayUnion } from 'firebase/firestore'
import { useState } from 'react'

import firebaseUpdateDoc from '@/firebase/updateDoc'

export const GroupList = ({ groups, tournamentRef }) => {
  // const [listOfPlayers, setListOfPlayers] = useState('')
  // const [selectedCategory, setSelectedCategory] = useState('')
  // const { isOpen, onOpen, onClose } = useDisclosure()

  // console.log(categories)

  // let handleInputChange = (e) => {
  //   let inputValue = e.target.value
  //   setListOfPlayers(inputValue)
  // }

  // const onImportPlayers = () => {
  //   let parsedPlayers = listOfPlayers.split(/\r?\n/).map((player) => {
  //     return {
  //       name: player,
  //       category: selectedCategory
  //     }
  //   })

  //   firebaseUpdateDoc(tournamentRef, {
  //     players: arrayUnion(...parsedPlayers)
  //   })
  //     .then((response) => {
  //       console.log('response', response)
  //     })
  //     .catch((error) => {
  //       console.log('error', error)
  //     })
  //   console.log(parsedPlayers)
  // }

  console.log(groups)

  return (
    <>
      <SimpleGrid columns={4} spacing={4}>
        {groups.map((group) => (
          <Card
            key={group.id}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            flex="1"
            flexDirection="column"
            mb={4}
          >
            <Heading size="sm">{group.name}</Heading>
            {group.players.map((player) => (
              <Text>{player.name}</Text>
            ))}
          </Card>
        ))}
      </SimpleGrid>
    </>
  )
}

export default GroupList
