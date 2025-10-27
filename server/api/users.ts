import { users } from '../../server/db/users'

export default defineEventHandler(() => {
  return users.map((u) => ({
    name: u.name,
    email: u.email,
  }))
})
