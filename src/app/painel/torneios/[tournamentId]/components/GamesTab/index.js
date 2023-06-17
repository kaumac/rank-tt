import {
  Avatar,
  Box,
  Button,
  Card,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  BiArrowFromLeft,
  BiCollection,
  BiCustomize,
  BiDotsVerticalRounded,
  BiGroup,
  BiIdCard,
  BiReflectHorizontal,
  BiSearch
} from 'react-icons/bi'

import { indexCollectionDocsById } from '@/firebase'
import {
  useTournamentCategories,
  useTournamentCategoryGames,
  useTournamentCategoryGroups,
  useTournamentCategoryPlayers,
  useTournamentCategoryStageGames,
  useTournamentGames,
  useTournamentPlayers
} from '@/hooks/useTournament'

import StartTournamentWrapper from '../StartTournamentWrapper'
import GroupMatchesCard from './components/GroupMatchesCard'

export const GamesTab = ({ tournament }) => {
  const [categoryFilter, setCategoryFilter] = useState()
  const [stageFilter, setStageFilter] = useState()
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
    useTournamentPlayers(tournament?.data?.id)
  const [categories, categoriesLoading, categoriesError] = useTournamentCategories(
    tournament?.data?.id
  )
  const tournamentGames = useTournamentGames(tournament?.data?.id)

  const [categoryGroups, categoryGroupsLoading, categoryGroupsError] = useTournamentCategoryGroups(
    tournament?.data?.id,
    categoryFilter
  )

  const [categoryPlayers, categoryPlayersLoading, categoryPlayersError] =
    useTournamentCategoryPlayers(tournament?.data?.id, categoryFilter)

  const [categoryGames, categoryGamesLoading, categoryGamesError] = useTournamentCategoryGames(
    tournament?.data?.id,
    categoryFilter
  )

  const [categoryStageGames, categoryStageGamesLoading, categoryStageGamesError] =
    useTournamentCategoryStageGames(tournament?.data?.id, categoryFilter, stageFilter)

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

  const categoryGamesData = categoryGames?.data()

  return (
    <>
      {tournament?.data?.status !== 'created' && (tournamentGames?.data || []).length > 0 ? (
        <Flex flex="1" flexDirection="column">
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
              <InputGroup bg="white" maxWidth="360px" mr={{ lg: 4, xl: 6 }}>
                <label htmlFor="testeiro">
                  <InputLeftAddon bg="gray.200">
                    <Flex alignItems="center">
                      <Icon color="gray.600" fontSize="20px" as={BiReflectHorizontal} mr={2} />
                      <Text fontSize="sm" color="gray.600" fontWeight="bold">
                        Fase
                      </Text>
                    </Flex>
                  </InputLeftAddon>
                </label>
                <Select
                  id="testeiro"
                  bg="white"
                  borderColor="gray.200"
                  color="black"
                  placeholder="Selecione uma fase"
                  onChange={(e) => setStageFilter(e.target.value)}
                  value={stageFilter}
                  size="md"
                  borderTopLeftRadius={0}
                  borderBottomLeftRadius={0}
                >
                  {categoryGamesData?.stages.map((stage) => {
                    return (
                      <option value={stage} key={`players-tab-category-option-${stage}`}>
                        {stage}
                      </option>
                    )
                  })}
                </Select>
              </InputGroup>
            </Flex>
            {categoryStageGames?.docs.length > 0 ? (
              <Flex
                px={{ lg: 6, xl: 8 }}
                bg="gray.100"
                py={{ lg: 2, xl: 4 }}
                alignItems="center"
                borderBottom="1px solid #EEEEEE"
                flexDirection="column"
              >
                {categoryStageGames?.docs.map((game) => {
                  const gameGroupData = game.data()

                  return (
                    <GroupMatchesCard
                      groupNumber={gameGroupData.groupNumber}
                      tournamentId={tournament?.data?.id}
                      categoryId={categoryFilter}
                      stage={stageFilter}
                      gameGroup={gameGroupData.groupId}
                      players={indexedCategoryPlayers}
                      key={`group-matches-card-${gameGroupData.groupId}`}
                    />
                  )
                })}
              </Flex>
            ) : null}
          </Box>
        </Flex>
      ) : (
        <Flex flex="1" alignItems="center" justifyContent="center" flexDirection="column">
          <Heading size="md" color="gray.600" mt={4}>
            Torneio ainda não iniciado
          </Heading>
          <Text textAlign="center" mb={8} mt={2} color="gray.600">
            Inicie o torneio para visualizar e gerenciar os jogos
          </Text>
          <Flex>
            <StartTournamentWrapper tournamentId={tournament?.data?.id}>
              <Button borderRadius="100px" colorScheme="brand">
                Iniciar torneio
              </Button>
            </StartTournamentWrapper>
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
    </>
  )
}

export default GamesTab
