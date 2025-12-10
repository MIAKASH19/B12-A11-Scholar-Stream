import React, { use } from 'react'
import { AuthContext } from '../Contexts/AuthContext'

const useAuth = () => {
    const authinfo = use(AuthContext)
  return authinfo
}

export default useAuth