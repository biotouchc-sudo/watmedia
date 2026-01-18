import { auth, currentUser } from '@clerk/nextjs/server'
import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getOrSyncUser() {
  const { userId } = await auth()
  const user = await currentUser()

  if (!userId || !user) return null

  // Check if user exists
  const existingUser = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })

  if (!existingUser) {
    const email = user.emailAddresses[0]?.emailAddress
    if (email) {
      await db.insert(users).values({
        id: userId,
        email: email,
        role: 'user',
      })
    }
  }

  return userId
}
