import { doc } from 'firebase/firestore'

import { Card, Center, Flex, Heading, Radio, Stack, Text } from '@chakra-ui/react'

import { TOURNAMENT_FORMAT } from '@/constants'
import { db, updateDoc } from '@/firebase'
import { useTournamentCategories } from '@/hooks/useTournament'

import AddCategories from './components/AddCategories'
import SelectTournamentFormat from './components/SelectTournamentFormat'
import SetupProgress from './components/SetupProgress'

export const SetupTournament = ({ tournament }) => {
  const [categories, categoriesLoading, categoriesError] = useTournamentCategories(tournament?.id)
  const tournamentData = tournament?.data()

  const setTournamentFormat = async (format) => {
    const updatedTournament = await updateDoc(tournament.ref, {
      settings: {
        tournamentFormat: format
      }
    })

    return updatedTournament
  }

  const completedSteps = {
    tournamentFormat: !!tournamentData?.settings?.tournamentFormat,
    tournamentCategories:
      tournamentData?.settings?.tournamentFormat === TOURNAMENT_FORMAT.NO_CATEGORIES ||
      (categories?.docs && categories?.docs.length > 0),
    tournamentGroups: Object.keys(tournamentData?.settings?.groups || {}).length > 0,
    tournamentGames: Object.keys(tournamentData?.settings?.games || {}).length > 0,
    tournamentTables: Object.keys(tournamentData?.settings?.tables || {}).length > 0
  }

  return (
    <Flex flex="1">
      <SetupProgress completedSteps={completedSteps} />
      <Center flex="1" flexDirection="column" p={8}>
        {!completedSteps.tournamentFormat && (
          <SelectTournamentFormat onSelect={setTournamentFormat} />
        )}
        {!completedSteps.tournamentCategories && !!completedSteps.tournamentFormat && (
          <AddCategories tournamentRef={tournament?.ref} />
        )}
      </Center>
    </Flex>
  )
}

export default SetupTournament