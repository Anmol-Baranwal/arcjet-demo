import arcjet, { tokenBucket } from '@arcjet/next'
import { NextResponse } from 'next/server'

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ['userId'], // track requests by a custom user ID
  rules: [
    tokenBucket({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
      refillRate: 2, // refill 2 tokens per interval
      interval: 40, // refill every 40 seconds
      capacity: 2, // bucket maximum capacity of 2 tokens
    }),
  ],
})

export async function GET(req: Request) {
  const userId = 'user123' // Replace with your authenticated user ID
  const decision = await aj.protect(req, { userId, requested: 1 }) // Deduct 1 token from the bucket
  console.log('Arcjet SDK decision', decision)

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: 'Too Many Requests', reason: decision.reason },
      { status: 429 }
    )
  }

  return NextResponse.json({ message: 'OK' })
}
