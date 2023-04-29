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

import {
  useTournamentPlayers,
  useTournamentCategories
} from '@/hooks/useTournament'

import ImportPlayersButton from './components/ImportPlayersButton'

export const PlayersTab = ({ tournament }) => {
  const [
    tournamentPlayersSnapshot,
    tournamentPlayers,
    tournamentPlayersLoading,
    tournamentPlayersError
  ] = useTournamentPlayers(tournament?.id)
  const [categoriesSnapshot, categories, categoriesLoading, categoriesError] =
    useTournamentCategories(tournament?.id)
  const tournamentData = tournament?.data()

  return (
    <>
      {tournamentPlayers && tournamentPlayers.length > 0 ? (
        <Box flex="1" p={8}>
          <ImportPlayersButton
            categories={categories}
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
                {tournamentPlayers.map((player) => (
                  <Tr key={`player-list-item-${player.id}`}>
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
              categories={categories}
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