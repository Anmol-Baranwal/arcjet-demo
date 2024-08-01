'use client'

import Header from '@/components/header'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

export default function RateLimiting() {
  const [message, setMessage] = useState('')

  const handleClick = async () => {
    const res = await fetch('/api/rate-limiting')
    const data = await res.json()

    if (res.status === 429) {
      setMessage(data.error)
    } else {
      setMessage(
        `HTTP 200: OK. ${data.remaining} requests remaining. Reset in ${data.reset} seconds.`
      )
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Rate Limiting Example"
        docsLink="/https://docs.arcjet.com/rate-limiting/quick-start/nextjs"
      />
      <div className="container pb-20 pt-12">
        <button
          onClick={handleClick}
          className={buttonVariants({ variant: 'primary' })}
        >
          Click ME to Call API
        </button>
        {message && (
          <div className="mt-4 w-fit rounded border border-dashed border-white bg-transparent p-4 text-white">
            <p>{message}</p>
          </div>
        )}
      </div>
      <p className="container space-y-1 text-gray-400">
        <div>
          The limit is set to 4 requests every 60 seconds. <br />
          After this, 2 requests are refilled every minute until it reaches 4
          requests. Use it wisely :)
        </div>
        <div className="pt-1">
          Rate limits can be{' '}
          <Link
            href={'https://docs.arcjet.com/reference/nextjs#ad-hoc-rules'}
            className="border-b border-gray-400"
          >
            dynamically adjusted{' '}
          </Link>
          e.g. to set a limit based on the authenticated user.
        </div>
      </p>
    </div>
  )
}
