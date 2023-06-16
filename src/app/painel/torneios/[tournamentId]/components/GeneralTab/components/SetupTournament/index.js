import { doc } from 'firebase/firestore'

import { Card, Center, Flex, Heading, Radio, Stack, Text } from '@chakra-ui/react'

import { TOURNAMENT_FORMAT } from '@/constants'
import { db, updateDoc } from '@/firebase'
import { useTournamentCategories } from '@/hooks/useTournament'

import AddCategories from './components/AddCategories'
import GroupSettings from './components/GroupSettings'
import SelectTournamentFormat from './components/SelectTournamentFormat'
import SetupProgress from './components/SetupProgress'

export const SetupTournament = ({ tournament, tournamentId }) => {
  const [categories, categoriesLoading, categoriesError] = useTournamentCategories(tournament?.id)

  const tournamentRef = doc(db, 'tournaments', tournamentId)

  const setTournamentFormat = async (format) => {
    const updatedTournament = await updateDoc(tournamentRef, {
      settings: {
        tournamentFormat: format
      }
    })
    return updatedTournament
  }

  const setTournamentGroupSettings = async (groupSettings) => {
    const updatedTournament = await updateDoc(tournamentRef, {
      settings: {
        groups: groupSettings || {}
      }
    })
    return updatedTournament
  }

  const completedSteps = {
    tournamentFormat: !tournament?.settings?.tournamentFormat,
    tournamentCategories:
      tournament?.settings?.tournamentFormat === TOURNAMENT_FORMAT.NO_CATEGORIES ||
      (categories?.docs && categories?.docs.length > 0),
    tournamentGroups: Object.keys(tournament?.settings?.groups || {}).length > 0,
    tournamentGames: Object.keys(tournament?.settings?.games || {}).length > 0,
    tournamentTables: Object.keys(tournament?.settings?.tables || {}).length > 0
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
        {!completedSteps.tournamentGroups &&
          !!completedSteps.tournamentFormat &&
          !!completedSteps.tournamentCategories && (
            <GroupSettings onSave={setTournamentGroupSettings} />
          )}
      </Center>
    </Flex>
  )
}

export default SetupTournament
