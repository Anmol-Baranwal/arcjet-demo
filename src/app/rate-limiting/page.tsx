'use client'

import Header from '@/components/header'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function RateLimiting() {
  const [message, setMessage] = useState('')
  const [remaining, setRemaining] = useState(2)
  const [timer, setTimer] = useState(0)

  const handleClick = async () => {
    if (remaining > 0) {
      const res = await fetch('/api/rate-limiting')
      const data = await res.json()
      const newMessage = `HTTP ${res.status}: ${data.message}. ${remaining - 1} requests remaining.`
      setMessage(newMessage)

      // Update the remaining requests
      setRemaining(remaining - 1)

      // If this is the first click, start the timer
      if (remaining === 2) {
        setTimer(40)
      }
    } else {
      setMessage('HTTP 429: Too many requests.')
    }
  }

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((timer) => timer - 1)
      }, 1000)
    } else if (timer === 0 && remaining === 0) {
      setRemaining(2) // Reset the remaining requests after timer ends
      setMessage('')
    }

    return () => clearInterval(interval)
  }, [remaining, timer])

  useEffect(() => {
    if (timer > 0 && remaining === 0) {
      setMessage(`HTTP 429: Too many requests.`)
    }
  }, [timer, remaining])

  return (
    <div className="min-h-screen bg-black">
      <Header title="Rate Limiting Example" docsLink="/docs" />
      <div className="container py-20">
        <button
          onClick={handleClick}
          className={buttonVariants({ variant: 'primary' })}
        >
          Click ME to Call API
        </button>
        {message && (
          <div className="mt-4 w-fit rounded border border-dashed border-white bg-transparent p-4 text-white">
            <p>
              {message} {`Reset in ${timer} seconds.`}
            </p>
          </div>
        )}
      </div>
      <p className="container space-y-1 text-gray-400">
        <div>The limit is set to 2 requests every 40 seconds.</div>
        <div>
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
