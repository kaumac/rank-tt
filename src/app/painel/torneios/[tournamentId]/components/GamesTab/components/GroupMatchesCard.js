import { collection } from 'firebase/firestore'

import { Box, useDisclosure } from '@chakra-ui/react'

import { useTournamentCategoryStageGamesGroupMatches } from '@/hooks/useTournament'

export const GroupMatchesCard = ({
  tournamentId,
  categoryId,
  stage,
  gameGroup,
  groupNumber,
  players
}) => {
  const [groupMatches, groupMatchesLoading, groupMatchesError] =
    useTournamentCategoryStageGamesGroupMatches(tournamentId, categoryId, stage, gameGroup)

  console.log(groupMatches?.docs)

  return (
    <>
      Grupo {groupNumber}
      {groupMatchesLoading && <Box>Carregando...</Box>}
      {groupMatchesError && <Box>Erro ao carregar</Box>}
      {groupMatches && (
        <Box>
          {groupMatches?.docs.map((groupMatch) => (
            <Box key={groupMatch.id}>
              {players[groupMatch.data().player1].data().name} x{' '}
              {players[groupMatch.data().player2].data().name}
            </Box>
          ))}
        </Box>
      )}
    </>
  )
}

export default GroupMatchesCard
