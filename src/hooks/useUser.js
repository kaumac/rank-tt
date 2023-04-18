import { useAuthState } from 'react-firebase-hooks/auth'

import { auth } from '@/firebase'

const usePremiumUser = () => {
  const [user, userLoading, error] = useAuthState(auth)

  return [user, userLoading, error]
}

export default usePremiumUser
