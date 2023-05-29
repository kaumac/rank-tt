import useTournament from '@/hooks/useTournament'

import SetupTournament from './components/SetupTournament'

export const GamesTab = ({ tournamentId }) => {
  const {
    data: tournament,
    isLoading: tournamentIsLoading,
    isError: tournamentIsError
  } = useTournament(tournamentId)

  const tournamentData = tournament?.data()

  return (
    <>
      <SetupTournament tournament={tournament} />
    </>
  )
}

export default GamesTab
