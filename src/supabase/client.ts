import {
  createClientComponentClient // createServerComponentClient
} from '@supabase/auth-helpers-nextjs'

// import { cookies } from 'next/headers'

export const browserClient = createClientComponentClient()
// export const serverClient = createServerComponentClient({
//   cookies
// })
