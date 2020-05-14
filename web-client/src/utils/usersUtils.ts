import { CLIENT } from 'types/client'
import { API } from 'types/api'
import { getFromMap } from 'utils/immutableUtils'

export const DEFAULT_USER: CLIENT.User = {
  id: -1,
  username: 'Unknown',
  email: 'Unknown',
  firstName: 'Unknown',
  lastName: '',
}

export function mapApiUserToClient(apiUser: API.User): CLIENT.User {
  return {
    id: apiUser.id,
    username: apiUser.username,
    email: apiUser.email,
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
  }
}

export function getUserFullName(user: CLIENT.User): string {
  return `${user.firstName} ${user.lastName}`
}

export function getUsersByIds(usersMap: CLIENT.UsersMap, userIds: number[]): CLIENT.User[] {
  return userIds
    .map((userId) => getFromMap(usersMap, userId))
    .filter((user): user is CLIENT.User => user !== undefined)
}

export function getCurrentUser(usersMap: CLIENT.UsersMap, currentUserId: number): CLIENT.User {
  return getFromMap(usersMap, currentUserId, DEFAULT_USER)
}
