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
                  <Box key={`games-tab-category-option-${category.id}`}>
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
              <Button>Botao aqui</Button>
            </Flex>
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