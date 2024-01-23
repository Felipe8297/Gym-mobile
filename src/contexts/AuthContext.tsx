import { createContext, ReactNode, useEffect, useState } from 'react'

import { UserDTO } from '@/dtos/UserDTO'
import { api } from '@/services/api'
import { storageUserGet, storageUserSave } from '@/storage/storageUser'

export type AuthContextDataProps = {
  user: UserDTO
  singIn: (email: string, password: string) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState({} as UserDTO)

  async function singIn(email: string, password: string) {
    try {
      // se der erro alguma hora verificar esse bloco de código
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        storageUserSave(data.user)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserGet()

    if (userLogged) {
      setUser(userLogged)
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <AuthContext.Provider value={{ user, singIn }}>
      {children}
    </AuthContext.Provider>
  )
}
