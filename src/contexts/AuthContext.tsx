import { createContext, ReactNode } from 'react'

import { UserDTO } from '@/dtos/UserDTO'

export type AuthContextDataProps = {
  user: UserDTO
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  return (
    <AuthContext.Provider
      value={{
        user: {
          name: 'Felipe Soares da Silva',
          email: 'felipe8297@gmail.com',
          avatar: 'felipe.png',
          id: '1',
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
