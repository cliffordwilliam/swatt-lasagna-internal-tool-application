'use client'

import { useClerk } from '@clerk/nextjs'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

export const SignOutButton = () => {
  const { signOut } = useClerk()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut() // Attempt to sign out
    } catch (error) {
      console.error('Sign-out error:', error) // Log the error for debugging
    } finally {
      // Redirect to the sign-in page regardless of success or failure
      router.push('/sign-in')
    }
  }

  return (
    <Button variant="outlined" color="error" onClick={handleSignOut}>
      Sign Out
    </Button>
  )
}
