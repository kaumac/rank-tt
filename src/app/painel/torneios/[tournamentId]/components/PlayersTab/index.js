import {
  Heading,
  Icon,
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
  Grid,
  GridItem,
  Card,
  Center,
  Avatar,
  IconButton,
  Stack,
  Select,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Input,
  InputLeftAddon,
  InputGroup
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  BiArrowFromLeft,
  BiCollection,
  BiCustomize,
  BiDotsVerticalRounded,
  BiGridAlt,
  BiGridVertical,
  BiGroup,
  BiIdCard,
  BiListUl,
  BiMenu,
  BiMenuAltLeft,
  BiPlus,
  BiSearch
} from 'react-icons/bi'

import { indexCollectionDocsById } from '@/firebase'
import {
  useTournamentPlayers,
  useTournamentCategories,
  useTournamentCategoryGroups,
  useTournamentCategoryPlayers
} from '@/hooks/useTournament'

import CreateGroupWrapper from './components/CreateGroupWrapper'
import EditGroupPanel from './components/EditGroupPanel'
import ImportPlayersButton from './components/ImportPlayersButton'

export const PlayersTab = ({ tournament }) => {
  const [categoryFilter, setCategoryFilter] = useState()
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [selectedGroupId, setSelectedGroupId] = useState(null)
  const {
    isOpen: isPlayerPanelOpen,
    onOpen: onOpenPlayerPanel,
    onClose: onClosePlayerPanel
  } = useDisclosure()
  const {
    isOpen: isGroupPanelOpen,
    onOpen: onOpenGroupPanel,
    onClose: onCloseGroupPanel
  } = useDisclosure()

  const [tournamentPlayers, tournamentPlayersLoading, tournamentPlayersError] =
    useTournamentPlayers(tournament?.id)
  const [categories, categoriesLoading, categoriesError] = useTournamentCategories(tournament?.id)
  const [categoryGroups, categoryGroupsLoading, categoryGroupsError] = useTournamentCategoryGroups(
    tournament?.id,
    categoryFilter
  )
  const [categoryPlayers, categoryPlayersLoading, categoryPlayersError] =
    useTournamentCategoryPlayers(tournament?.id, categoryFilter)

  const indexedCategories = indexCollectionDocsById(categories)
  const indexedCategoryPlayers = indexCollectionDocsById(categoryPlayers)

  const selectedCategoryData =
    indexedCategories[categoryFilter] && indexedCategories[categoryFilter].data()

  const handlePlayerClick = (playerId) => {
    setSelectedPlayer(playerId)
    onOpenPlayerPanel()
  }

  const handlePlayerPanelClose = () => {
    setSelectedPlayer(null)
    onClosePlayerPanel()
  }

  const handleGroupClick = (groupId) => {
    setSelectedGroupId(groupId)
    onOpenGroupPanel()
  }

  const handleGroupPanelClose = () => {
    setSelectedGroupId(null)
    onCloseGroupPanel()
  }

  useEffect(() => {
    if (categories?.docs.length > 0) {
      setCategoryFilter(categories?.docs[0].id)
    }
  }, [categories])

  return (
    <>
      {tournamentPlayers && tournamentPlayers?.docs.length > 0 ? (
        <Flex flex="1">
          <Box flex="1">
            <Flex
              px={{ lg: 6, xl: 8 }}
              bg="gray.100"
              py={{ lg: 2, xl: 4 }}
              alignItems="center"
              borderBottom="1px solid #EEEEEE"
            >
              <InputGroup bg="white" maxWidth="360px" mr={{ lg: 4, xl: 6 }}>
                <label htmlFor="testeiro">
                  <InputLeftAddon bg="gray.200">
                    <Flex alignItems="center">
                      <Icon color="gray.600" fontSize="20px" as={BiCollection} mr={2} />
                      <Text fontSize="sm" color="gray.600" fontWeight="bold">
                        Categoria
                      </Text>
                    </Flex>
                  </InputLeftAddon>
                </label>
                <Select
                  id="testeiro"
                  bg="white"
                  borderColor="gray.200"
                  color="black"
                  placeholder="Selecione uma categoria"
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  value={categoryFilter}
                  size="md"
                  borderTopLeftRadius={0}
                  borderBottomLeftRadius={0}
                >
                  {categories?.docs.map((category) => {
                    const categoryData = category.data()

                    return (
                      <option
                        value={category.id}
                        key={`players-tab-category-option-${category.id}`}
                      >
                        {categoryData.name}
                      </option>
                    )
                  })}
                </Select>
              </InputGroup>
              <InputGroup bg="white" maxWidth={600}>
                <InputLeftAddon bg="gray.200">
                  <Flex alignItems="center">
                    <Icon color="gray.600" fontSize="20px" as={BiSearch} mr={2} />
                    <Text fontSize="sm" color="gray.600" fontWeight="bold">
                      Busca
                    </Text>
                  </Flex>
                </InputLeftAddon>
                <Input placeholder="Número do grupo ou nome do atleta" />
              </InputGroup>
            </Flex>
            <Flex px={{ lg: 6, xl: 8 }} alignItems="center" mt={10}>
              <Heading size="md" mr={4}>
                Grupos
              </Heading>
              <CreateGroupWrapper
                tournament={tournament}
                categoryPlayers={categoryPlayers}
                categoryGroups={categoryGroups}
                category={indexedCategories[categoryFilter]}
              >
                <Button size="sm" ml={2} leftIcon={<BiCustomize fontSize="18px" />}>
                  Criar grupo
                </Button>
              </CreateGroupWrapper>
            </Flex>
            <Grid
              templateColumns={{ lg: 'repeat(3, 1fr)', xl: 'repeat(4, 1fr)' }}
              gap={{ lg: 4, xl: 6 }}
              px={{ lg: 6, xl: 8 }}
              mt={8}
            >
              {categoryGroups?.docs.map((group) => {
                const groupData = group.data()

                return (
                  <GridItem w="100%" key={`players-tab-group-list-item-${group.id}`}>
                    <Card
                      pt={4}
                      cursor="pointer"
                      onClick={() => {
                        handleGroupClick(group.id)
                      }}
                    >
                      <Flex alignItems="center" mb={4} justifyContent="space-between">
                        <Flex alignItems="center">
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
                        <IconButton
                          variant="ghost"
                          size="sm"
                          icon={<BiDotsVerticalRounded />}
                          transform="translateX(10px)"
                        />
                      </Flex>

                      <Stack>
                        {groupData.players.map((player) => (
                          <Flex alignItems="center" key={player.id}>
                            <Avatar
                              size="xs"
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
                              size="xs"
                              colorScheme="brand"
                              bg="gray.300"
                              icon={<BiArrowFromLeft fontSize={18} />}
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
            <Flex px={{ lg: 6, xl: 8 }} alignItems="center" mt={10}>
              <Heading size="md" mr={4}>
                Jogadores
              </Heading>
              <ImportPlayersButton
                category={indexedCategories[categoryFilter]}
                tournamentRef={tournament?.ref}
              />
            </Flex>
            <Card px={0} m={{ lg: 6, xl: 10 }}>
              <TableContainer width="100%">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Nome</Th>
                      <Th>Status</Th>
                      <Th isNumeric width="80px">
                        Grupo
                      </Th>
                      <Th width="200px">Sub-categoria</Th>
                      <Th textAlign="right" width="80px">
                        Ver
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {(categoryPlayers?.docs || []).map((player) => {
                      const playerData = player.data()

                      return (
                        <Tr
                          key={`player-list-item-${player.id}`}
                          cursor="pointer"
                          onClick={() => handlePlayerClick(player.id)}
                        >
                          <Td>{playerData.name}</Td>
                          <Td>
                            <Text
                              as="span"
                              color={playerData.status === 'active' ? 'green.500' : 'red.500'}
                            >
                              {playerData.status === 'active' ? 'Ativo' : 'Check-in pendente'}
                            </Text>
                          </Td>
                          <Td width="80px">{playerData.groupNumber || '-'}</Td>
                          <Td width="200px">{playerData.subCategory}</Td>
                          <Td textAlign="right" width="80px">
                            <IconButton
                              variant="ghost"
                              borderRadius="full"
                              colorScheme="brand"
                              bg="brand.100"
                              aria-label="Call Sage"
                              fontSize="18px"
                              size="sm"
                              icon={<BiIdCard />}
                            />
                          </Td>
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
        <Flex flex="1" alignItems="center" justifyContent="center" flexDirection="column">
          <img src="/gifs/engagement.gif" width="120px" />
          <Heading size="md" color="gray.600" mt={4}>
            Nenhum atleta cadastrado ainda
          </Heading>
          <Text textAlign="center" mb={8} mt={2} color="gray.600">
            Você pode cadastrar atletas manualmente ou compartilhar o link <br /> da página de
            inscrição do torneio para que os atletas se inscrevam.
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
      <Drawer
        placement="right"
        isOpen={isPlayerPanelOpen}
        onClose={handlePlayerPanelClose}
        size="sm"
      >
        <DrawerOverlay backdropFilter="blur(6px)" bg="rgba(255,255,255,0.5)" />
        <DrawerContent
          boxShadow="0 0 140px 0 rgba(0,0,0,0.1), 0 0 20px 0 rgba(0,0,0,0.05)"
          borderLeft="1px solid"
          borderColor="gray.200"
        >
          <DrawerHeader borderBottomWidth="1px">
            <Flex justifyContent="space-between" alignItems="center">
              <Flex alignItems="center">
                <Avatar
                  size="sm"
                  bg="brand.500"
                  color="white"
                  name={
                    indexedCategoryPlayers[selectedPlayer] &&
                    indexedCategoryPlayers[selectedPlayer].data().name
                  }
                  src={
                    indexedCategoryPlayers[selectedPlayer] &&
                    indexedCategoryPlayers[selectedPlayer].data().photoURL
                  }
                />
                <Text fontSize="sm" color="gray.700" ml={2}>
                  {indexedCategoryPlayers[selectedPlayer] &&
                    indexedCategoryPlayers[selectedPlayer].data().name}
                </Text>
              </Flex>
            </Flex>
          </DrawerHeader>
          <DrawerBody>
            <Button variant="solid" colorScheme="black" width="100%">
              Confirmar check-in
            </Button>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <EditGroupPanel
        isOpen={isGroupPanelOpen}
        onClose={handleGroupPanelClose}
        tournamentId={tournament?.id}
        groupId={selectedGroupId}
        group={(categoryGroups?.docs || []).find((doc) => doc.id === selectedGroupId)}
      />
    </>
  )
}

export default PlayersTab
