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
  IconButton
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'

import { indexCollectionDocsById } from '@/firebase'
import { groupCollectionDocsByField } from '@/firebase/utils'
import {
  useTournamentPlayers,
  useTournamentCategories
} from '@/hooks/useTournament'

import CreateGroupWrapper from './components/CreateGroupWrapper'
import ImportPlayersButton from './components/ImportPlayersButton'

export const PlayersTab = ({ tournament }) => {
  const [tournamentPlayers, tournamentPlayersLoading, tournamentPlayersError] =
    useTournamentPlayers(tournament?.id)
  const [categories, categoriesLoading, categoriesError] =
    useTournamentCategories(tournament?.id)
  const tournamentData = tournament?.data()
  const [categoryFilter, setCategoryFilter] = useState()

  const indexedCategories = indexCollectionDocsById(categories)
  const groupedPlayers = groupCollectionDocsByField(
    tournamentPlayers,
    'category'
  )

  console.log({ groupedPlayers })

  const selectedCategoryData =
    indexedCategories[categoryFilter] &&
    indexedCategories[categoryFilter].data()
  const selectedCategoryPlayers = groupedPlayers[categoryFilter]

  console.log('selectedCategoryPlayers', selectedCategoryPlayers)

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
            <Flex p={6} alignItems="center" mb={8}>
              <Heading size="md" pl={3} mr={8}>
                Categoria {selectedCategoryData?.name}
              </Heading>
              <ImportPlayersButton
                category={indexedCategories[categoryFilter]}
                tournamentRef={tournament?.ref}
              />
            </Flex>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} px={10} mb={16}>
              <GridItem w="100%">
                <Card height="140px">
                  <CreateGroupWrapper
                    players={selectedCategoryPlayers}
                    category={indexedCategories[categoryFilter]}
                  >
                    <Center height="100%" width="100%" cursor="pointer">
                      <IconButton
                        variant="solid"
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
              <GridItem w="100%">
                <Card>
                  <Heading color="gray.600" size="sm" mb={2}>
                    Grupo 01
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Kaue Machado
                  </Text>
                  <Divider color="gray.200" my={1} />
                  <Text fontSize="sm" color="gray.500">
                    Zé Driveiro
                  </Text>
                  <Divider color="gray.200" my={1} />
                  <Text fontSize="sm" color="gray.500">
                    Jão do Back
                  </Text>
                </Card>
              </GridItem>
              <GridItem w="100%">
                <Card>
                  <Heading color="gray.600" size="sm" mb={2}>
                    Grupo 01
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Kaue Machado
                  </Text>
                  <Divider color="gray.200" my={1} />
                  <Text fontSize="sm" color="gray.500">
                    Zé Driveiro
                  </Text>
                  <Divider color="gray.200" my={1} />
                  <Text fontSize="sm" color="gray.500">
                    Jão do Back
                  </Text>
                </Card>
              </GridItem>
              <GridItem w="100%">
                <Card>
                  <Heading color="gray.600" size="sm" mb={2}>
                    Grupo 01
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Kaue Machado
                  </Text>
                  <Divider color="gray.200" my={1} />
                  <Text fontSize="sm" color="gray.500">
                    Zé Driveiro
                  </Text>
                  <Divider color="gray.200" my={1} />
                  <Text fontSize="sm" color="gray.500">
                    Jão do Back
                  </Text>
                </Card>
              </GridItem>
              <GridItem w="100%">
                <Card>
                  <Heading color="gray.600" size="sm" mb={2}>
                    Grupo 01
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    Kaue Machado
                  </Text>
                  <Divider color="gray.200" my={1} />
                  <Text fontSize="sm" color="gray.500">
                    Zé Driveiro
                  </Text>
                  <Divider color="gray.200" my={1} />
                  <Text fontSize="sm" color="gray.500">
                    Jão do Back
                  </Text>
                </Card>
              </GridItem>
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
                    {(selectedCategoryPlayers || []).map((player) => {
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

export default PlayersTab
