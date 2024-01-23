import { createContext, ReactNode, useState } from 'react'

import { UserDTO } from '@/dtos/UserDTO'
import { api } from '@/services/api'

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
      const response = await api.post('/sessions', { email, password })

      if (response.data.user) {
        setUser(response.data.user)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, singIn }}>
      {children}
    </AuthContext.Provider>
  )
}
