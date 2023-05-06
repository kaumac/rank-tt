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
  Td,
  Tag,
  TagLabel
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { indexCollectionDocsById } from '@/firebase'
import { groupCollectionDocsByField } from '@/firebase/utils'
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
  const [categoryFilter, setCategoryFilter] = useState()

  const indexedCategories = indexCollectionDocsById(categories)
  const indexedPlayers = groupCollectionDocsByField(
    tournamentPlayers,
    'category'
  )

  const categoryPlayers = indexedPlayers[categoryFilter]

  console.log('categoryPlayers', categoryPlayers)

  useEffect(() => {
    if (categories?.docs.length > 0) {
      setCategoryFilter(categories?.docs[0].id)
    }
  }, [categories])

  return (
    <>
      {tournamentPlayers && tournamentPlayers?.docs.length > 0 ? (
        <Flex flex="1">
          <Box bg="white" p={8} pl={5} boxShadow="md">
            <Heading size="sm" mb={4} color="gray.600" pl={3}>
              Categorias
            </Heading>
            {/* <Tag
              size="lg"
              colorScheme={categoryFilter === 'all' ? 'green' : 'gray'}
              borderRadius="full"
              cursor="pointer"
              onClick={() => setCategoryFilter('all')}
              mb={2}
            >
              <TagLabel>Todas as categorias</TagLabel>
            </Tag> */}
            {categories?.docs.map((category) => {
              const categoryData = category.data()

              return (
                <Box>
                  <Tag
                    mb={2}
                    size="lg"
                    colorScheme={
                      categoryFilter === category.id ? 'green' : 'gray'
                    }
                    borderRadius="full"
                    cursor="pointer"
                    onClick={() => setCategoryFilter(category.id)}
                  >
                    <TagLabel>{categoryData.name}</TagLabel>
                  </Tag>
                </Box>
              )
            })}
          </Box>
          <Box flex="1">
            <Flex p={8} alignItems="center">
              <Heading size="lg" pl={3} mr={8}>
                Categoria {indexedCategories[categoryFilter]?.name}
              </Heading>
              <ImportPlayersButton
                categories={categories?.docs}
                tournamentRef={tournament?.ref}
              />
            </Flex>
            <TableContainer mt={8} width="100%" px={5}>
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
                            {playerData.status === 'active'
                              ? 'Ativo'
                              : 'Inativo'}
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
        </Flex>
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
