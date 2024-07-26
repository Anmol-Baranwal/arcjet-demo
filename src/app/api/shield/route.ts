import arcjet, { shield } from '@arcjet/next'
import { NextResponse } from 'next/server'

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ['userId'], // track requests by a custom user ID
  rules: [
    shield({
      mode: 'LIVE', // will block the request
    }),
  ],
})

export async function GET(req: Request) {
  const userId = 'user123'
  const decision = await aj.protect(req, { userId })

  if (decision.isDenied() && decision.reason.isShield()) {
    return NextResponse.json(
      {
        error: 'You seem suspicious :(',
        reason: decision.reason,
      },
      { status: 403 }
    )
  }

  return NextResponse.json({ message: 'OK' })
}
