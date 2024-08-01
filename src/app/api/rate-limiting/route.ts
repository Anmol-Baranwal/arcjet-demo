import arcjet, { tokenBucket } from '@arcjet/next'
import { NextResponse } from 'next/server'

// Configure Arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ['userId'], // you can also track requests by IP address using "ip.src"
  rules: [
    tokenBucket({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
      match: '/api/rate-limiting', // match all requests to /api/rate-limiting
      refillRate: 2, // refill 2 tokens per interval
      interval: 60, // refill every 60 seconds
      capacity: 4, // bucket maximum capacity of 4 tokens
    }),
  ],
})

export async function GET(req: Request) {
  const userId = 'user123' // Replace with your authenticated user ID
  const decision = await aj.protect(req, { userId, requested: 1 }) // Deduct 1 token from the bucket
  console.log('Arcjet SDK decision', decision.conclusion)

  let message = ''
  let remaining = 0
  let reset = 0

  if (decision.reason.isRateLimit()) {
    const resetTime = decision.reason.resetTime
    remaining = decision.reason.remaining

    if (resetTime) {
      const seconds = Math.floor((resetTime.getTime() - Date.now()) / 1000)
      reset = seconds
      message = `Reset in ${seconds} seconds.`
    }
  }

  if (decision.isDenied() && decision.reason.isRateLimit()) {
    return NextResponse.json(
      { error: `HTTP 429: Too many requests. ${message}`, remaining, reset },
      { status: 429 }
    )
  }

  return NextResponse.json(
    { message: 'HTTP 200: OK', remaining, reset },
    { status: 200 }
  )
}
