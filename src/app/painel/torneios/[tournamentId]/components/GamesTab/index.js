import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiArrowFromLeft, BiPlus } from 'react-icons/bi'

import { indexCollectionDocsById } from '@/firebase'
import { groupCollectionDocsByField } from '@/firebase/utils'
import {
  useTournamentCategories,
  useTournamentCategoryGroups,
  useTournamentCategoryPlayers,
  useTournamentPlayers
} from '@/hooks/useTournament'

import CreateGroupWrapper from './components/CreateGroupWrapper'
import ImportPlayersButton from './components/ImportPlayersButton'

export const GamesTab = ({ tournament }) => {
  const [categoryFilter, setCategoryFilter] = useState()
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

  useEffect(() => {
    if (categories?.docs.length > 0) {
      setCategoryFilter(categories?.docs[0].id)
    }
  }, [categories])

  return (
    <>
      {tournamentPlayers && tournamentPlayers?.docs.length > 0 ? (
        <Flex flex="1">
          <Box px={12} py={8} pl={5} borderRight="1px solid #EEE"></Box>
          <Box flex="1">
            <Flex p={6} alignItems="center" mb={8}>
              <Heading size="md" pl={3} mr={8}>
                Jogos ({selectedCategoryData?.name})
              </Heading>
              <Button>Botao aqui</Button>
            </Flex>
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
    </>
  )
}

export default GamesTab
