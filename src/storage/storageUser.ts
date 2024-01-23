import { UserDTO } from '@/dtos/UserDTO'

import { USER_STORAGE } from './storageConfig'

export async function storageUserSave(user: UserDTO) {
  await localStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const storage = await localStorage.getItem(USER_STORAGE)

  const user: UserDTO = storage ? JSON.parse(storage) : {}

  return user
}
