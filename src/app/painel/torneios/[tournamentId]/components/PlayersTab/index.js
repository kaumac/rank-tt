import {
  Heading,
  Text,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  FormControl,
  FormLabel,
  Select,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot
} from '@chakra-ui/react'

import ImportPlayersButton from './components/ImportPlayersButton'

export const PlayersTab = ({ tournament }) => {
  const tournamentData = tournament?.data()

  return (
    <>
      {tournamentData?.players.length > 0 ? (
        <Box flex="1" p={8}>
          <ImportPlayersButton
            categories={tournamentData?.categories}
            tournamentRef={tournament?.ref}
          />
          <TableContainer mt={8} width="100%">
            <Table variant="simple">
              {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
              <Thead>
                <Tr>
                  <Th>Nome</Th>
                  <Th>Status</Th>
                  <Th>Categoria</Th>
                  <Th isNumeric>Grupo</Th>
                  <Th>Sub-categoria</Th>
                  <Th isNumeric>Vitórias</Th>
                  <Th isNumeric>Derrotas</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tournamentData.players.map((player) => (
                  <Tr key={player.id}>
                    <Td>{player.name}</Td>
                    <Td>
                      <Text
                        as="span"
                        color={
                          player.status === 'active' ? 'green.500' : 'red.500'
                        }
                      >
                        {player.status === 'active' ? 'Ativo' : 'Inativo'}
                      </Text>
                    </Td>
                    <Td>{player.category}</Td>
                    <Td>{player.group}</Td>
                    <Td>{player.subCategory}</Td>
                    <Td isNumeric>{player.wins}</Td>
                    <Td isNumeric>{player.losses}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <Flex
          flex="1"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <img src="/gifs/engagement.gif" width="120px" />
          <Heading size="md" color="gray.600" mt={4}>
            Nenhum atleta cadastrado ainda
          </Heading>
          <Text textAlign="center" mb={8} mt={2} color="gray.600">
            Você pode cadastrar atletas manualmente ou compartilhar o link{' '}
            <br /> da página de inscrição do torneio para que os atletas se
            inscrevam.
          </Text>
          <Flex>
            <ImportPlayersButton
              categories={tournamentData?.categories}
              tournamentRef={tournament?.ref}
            />
            <Button borderRadius="100px" colorScheme="brand">
              Compartilhar link
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  )
}

export default PlayersTab
