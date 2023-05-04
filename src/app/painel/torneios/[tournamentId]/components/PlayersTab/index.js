import {
  Heading,
  Text,
  Flex,
  Button,
  Box,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td
} from '@chakra-ui/react'

import { indexCollectionDocsById } from '@/firebase'
import {
  useTournamentPlayers,
  useTournamentCategories
} from '@/hooks/useTournament'

import ImportPlayersButton from './components/ImportPlayersButton'

export const PlayersTab = ({ tournament }) => {
  const [tournamentPlayers, tournamentPlayersLoading, tournamentPlayersError] =
    useTournamentPlayers(tournament?.id)
  const [categories, categoriesLoading, categoriesError] =
    useTournamentCategories(tournament?.id)
  const tournamentData = tournament?.data()

  const indexedCategories = indexCollectionDocsById(categories)

  return (
    <>
      {tournamentPlayers && tournamentPlayers?.docs.length > 0 ? (
        <Box flex="1" p={8}>
          <ImportPlayersButton
            categories={categories?.docs}
            tournamentRef={tournament?.ref}
          />
          <TableContainer mt={8} width="100%">
            <Table variant="simple">
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
                {tournamentPlayers.docs.map((player) => {
                  const playerData = player.data()

                  return (
                    <Tr key={`player-list-item-${player.id}`}>
                      <Td>{playerData.name}</Td>
                      <Td>
                        <Text
                          as="span"
                          color={
                            playerData.status === 'active'
                              ? 'green.500'
                              : 'red.500'
                          }
                        >
                          {playerData.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Text>
                      </Td>
                      <Td>{indexedCategories[playerData.category]?.name}</Td>
                      <Td>{playerData.group}</Td>
                      <Td>{playerData.subCategory}</Td>
                      <Td isNumeric>{playerData.wins}</Td>
                      <Td isNumeric>{playerData.losses}</Td>
                    </Tr>
                  )
                })}
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
              categories={categories?.docs}
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
