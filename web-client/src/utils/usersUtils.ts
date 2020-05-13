import { CLIENT } from 'types/client'
import { API } from 'types/api'

export function mapApiUserToClient(apiUser: API.User): CLIENT.User {
  return {
    id: apiUser.id,
    username: apiUser.username,
    email: apiUser.email,
    firstName: apiUser.first_name,
    lastName: apiUser.last_name,
  }
}
