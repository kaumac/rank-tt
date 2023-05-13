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
  Icon,
  Th,
  Tbody,
  Td,
  Tag,
  TagLabel,
  Grid,
  GridItem,
  Card,
  Spacer,
  Divider,
  Center,
  Avatar,
  IconButton,
  Stack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiArrowFromLeft, BiPlus } from 'react-icons/bi'
import StickyBox from 'react-sticky-box'

import { indexCollectionDocsById } from '@/firebase'
import { groupCollectionDocsByField } from '@/firebase/utils'
import {
  useTournamentPlayers,
  useTournamentCategories,
  useTournamentCategoryGroups,
  useTournamentCategoryPlayers
} from '@/hooks/useTournament'

import CreateGroupWrapper from './components/CreateGroupWrapper'
import ImportPlayersButton from './components/ImportPlayersButton'

export const GamesTab = ({ tournament }) => {
  const [categoryFilter, setCategoryFilter] = useState()
  const [tournamentPlayers, tournamentPlayersLoading, tournamentPlayersError] =
    useTournamentPlayers(tournament?.id)
  const [categories, categoriesLoading, categoriesError] =
    useTournamentCategories(tournament?.id)
  const [categoryGroups, categoryGroupsLoading, categoryGroupsError] =
    useTournamentCategoryGroups(tournament?.id, categoryFilter)
  const [categoryPlayers, categoryPlayersLoading, categoryPlayersError] =
    useTournamentCategoryPlayers(tournament?.id, categoryFilter)

  const indexedCategories = indexCollectionDocsById(categories)
  const indexedCategoryPlayers = indexCollectionDocsById(categoryPlayers)

  const selectedCategoryData =
    indexedCategories[categoryFilter] &&
    indexedCategories[categoryFilter].data()

  useEffect(() => {
    if (categories?.docs.length > 0) {
      setCategoryFilter(categories?.docs[0].id)
    }
  }, [categories])

  return (
    <>
      {tournamentPlayers && tournamentPlayers?.docs.length > 0 ? (
        <Flex flex="1">
          <Box px={12} py={8} pl={5} borderRight="1px solid #EEE">
            <StickyBox offsetTop={92} offsetBottom={20}>
              <Heading size="sm" mb={4} color="gray.600" pl={3}>
                Categorias
              </Heading>

              {categories?.docs.map((category) => {
                const categoryData = category.data()

                return (
                  <Box>
                    <Tag
                      mb={2}
                      size="lg"
                      bg={
                        categoryFilter === category.id ? '#000' : 'transparent'
                      }
                      borderRadius="full"
                      cursor="pointer"
                      onClick={() => setCategoryFilter(category.id)}
                    >
                      <TagLabel
                        color={
                          categoryFilter === category.id ? '#FFF' : 'black'
                        }
                      >
                        {categoryData.name}
                      </TagLabel>
                    </Tag>
                  </Box>
                )
              })}
            </StickyBox>
          </Box>
          <Box flex="1">
            <Flex p={6} alignItems="center" mb={8}>
              <Heading size="md" pl={3} mr={8}>
                Jogos ({selectedCategoryData?.name})
              </Heading>
              <ImportPlayersButton
                category={indexedCategories[categoryFilter]}
                tournamentRef={tournament?.ref}
              />
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} px={10} mb={16}>
              <GridItem w="100%">
                <Card height="200px">
                  <CreateGroupWrapper
                    tournament={tournament}
                    categoryPlayers={categoryPlayers}
                    categoryGroups={categoryGroups}
                    category={indexedCategories[categoryFilter]}
                  >
                    <Center height="100%" width="100%" cursor="pointer">
                      <IconButton
                        variant="solid"
                        borderRadius="full"
                        colorScheme="brand"
                        aria-label="Call Sage"
                        fontSize="24px"
                        size="sm"
                        icon={<BiPlus />}
                      />
                      <Button
                        colorScheme="brand"
                        size="sm"
                        variant="link"
                        ml={2}
                      >
                        Criar novo grupo
                      </Button>
                    </Center>
                  </CreateGroupWrapper>
                </Card>
              </GridItem>
              {categoryGroups?.docs.map((group) => {
                const groupData = group.data()

                return (
                  <GridItem w="100%">
                    <Card>
                      <Flex alignItems="center" mb={4}>
                        <Heading color="gray.600" size="sm">
                          Grupo {groupData.number < 10 && '0'}
                          {groupData.number}
                        </Heading>
                        {groupData.hasBye && (
                          <Tag ml={4} colorScheme="brand">
                            Bye
                          </Tag>
                        )}
                      </Flex>

                      <Stack>
                        {groupData.players.map((player) => (
                          <Flex alignItems="center" key={player.id}>
                            <Avatar
                              size="sm"
                              colorScheme="green"
                              name={
                                indexedCategoryPlayers[player] &&
                                indexedCategoryPlayers[player].data().name
                              }
                              src={
                                indexedCategoryPlayers[player] &&
                                indexedCategoryPlayers[player].data().photoURL
                              }
                            />
                            <Text fontSize="sm" color="gray.700" ml={2}>
                              {indexedCategoryPlayers[player] &&
                                indexedCategoryPlayers[player].data().name}
                            </Text>
                          </Flex>
                        ))}
                        {groupData.hasBye && (
                          <Flex alignItems="center">
                            <Avatar
                              size="sm"
                              colorScheme="brand"
                              bg="gray.300"
                              icon={<BiArrowFromLeft fontSize={24} />}
                            />
                            <Text fontSize="sm" color="gray.500" ml={2}>
                              Bye
                            </Text>
                          </Flex>
                        )}
                      </Stack>
                    </Card>
                  </GridItem>
                )
              })}
            </Grid>
            <Card px={0} m={10}>
              <TableContainer width="100%">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th>Status</Th>
                      <Th isNumeric>Grupo</Th>
                      <Th>Sub-categoria</Th>
                      <Th isNumeric>Vitórias</Th>
                      <Th isNumeric>Derrotas</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {(categoryPlayers?.docs || []).map((player) => {
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
                          <Td>{playerData.groupNumber || '-'}</Td>
                          <Td>{playerData.subCategory}</Td>
                          <Td isNumeric>{playerData.wins}</Td>
                          <Td isNumeric>{playerData.losses}</Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Card>
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
              category={indexedCategories[categoryFilter]}
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

export default GamesTab
