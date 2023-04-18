import { auth } from '@/firebase'
import { Organization } from '@/types'

import push from './push'

const setNewOrganization = async (data: Organization) => {
  const createdOrg = await push('queueOrganizationCreation', {
    ...data,
    createdBy: auth?.currentUser?.uid
  })

  return createdOrg
}

export default setNewOrganization
