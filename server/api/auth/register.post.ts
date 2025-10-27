import { defineEventHandler, readBody } from 'h3'
import { users } from '../../../server/db/users' 

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, password } = body

  if (!name || !email || !password) {
    return { success: false, message: 'All fields are required' }
  }

  if (users.find(u => u.email === email)) {
    return { success: false, message: 'Email already registered' }
  }

  users.push({ name, email, password })
  return { success: true, message: 'Registered successfully' }
})
