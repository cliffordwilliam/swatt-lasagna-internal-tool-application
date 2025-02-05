'use client'

import { useClerk } from '@clerk/nextjs'

export const SignOutButton = () => {
  const { signOut } = useClerk()

  return (
    // Clicking this button signs out a user
    // and redirects them to the home page "/sign-in".
    <button onClick={() => signOut({ redirectUrl: '/sign-in' })}>Sign out</button>
  )
}
