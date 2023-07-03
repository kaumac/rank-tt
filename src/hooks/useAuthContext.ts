import { useContext } from 'react'

import { AuthContext } from '@/providers/AuthContextProvider'

export const useAuthContext = () => useContext(AuthContext)
