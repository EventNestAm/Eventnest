import { defineEventHandler, readBody } from 'h3'
import { users } from '../../../server/db/users'

export default defineEventHandler(async (event) => {
	const body = await readBody(event)
	const { email, password } = body

	const user = users.find(u => u.email === email && u.password === password)
	if (!user) return { success: false, message: 'Invalid email or password' }

	return { success: true, message: 'Login successful', token: 'dummy-token' }
})
