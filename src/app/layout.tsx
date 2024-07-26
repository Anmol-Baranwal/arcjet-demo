import type { Metadata } from 'next'
import '@/styles/globals.css'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import React from 'react'
import GitHubCornerEffect from '@/components/github-corner-effect'

export const metadata: Metadata = {
  title: 'Arcjet Demo',
  description: '✨ The testing of all of the core features of Arcjet.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen flex-col overflow-x-hidden font-sans antialiased',
          fontSans.variable
        )}
      >
        {children}
        <GitHubCornerEffect />
      </body>
    </html>
  )
}
