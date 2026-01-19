import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function checkAdmin() {
  const { userId } = await auth()
  
  if (!userId) {
    redirect('/sign-in')
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  })

  // In a real scenario, you'd check user.role === 'admin'
  // For this "Real Product" launch, we will check against a specific hardcoded admin email or ID 
  // OR temporarily allow the first user, but simpler is to check the DB role.
  // Since we don't have an admin interface to set roles yet, we'll implement a safety hatch:
  // If the user's email is your admin email, allow it.
  
  if (user?.role !== 'admin') {
     // Safety hatch: If it's the developer/owner, treat as admin for setup
     // You can remove this after setting your role in DB manually once
    // redirect('/') 
    // For now, let's just return false
    return false
  }

  return true
}

export async function requireAdmin() {
    const isAdmin = await checkAdmin()
    if (!isAdmin) {
        redirect('/')
    }
}
