import useTournament from '@/hooks/useTournament'

import SetupTournament from './components/SetupTournament'

export const GamesTab = ({ tournamentId }) => {
  console.log(tournamentId)
  const {
    data: tournament,
    isLoading: tournamentIsLoading,
    isError: tournamentIsError
  } = useTournament(tournamentId)

  return (
    <>
      <SetupTournament tournament={tournament} tournamentId={tournamentId} />
    </>
  )
}

export default GamesTab
