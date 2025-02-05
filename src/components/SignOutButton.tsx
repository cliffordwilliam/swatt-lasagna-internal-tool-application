'use client'

import { useClerk } from '@clerk/nextjs'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut() // Sign out the user
    router.push('/sign-in') // Redirect to the sign-in page
  }

  return (
    <Button variant="outlined" color="error" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
