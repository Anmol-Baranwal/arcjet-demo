import arcjet, { detectBot } from '@arcjet/next'
import { NextResponse } from 'next/server'

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  characteristics: ['userId'], // track requests by a custom user ID
  rules: [
    detectBot({
      mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
      block: ['AUTOMATED'], // blocks all automated clients (LIKELY_AUTOMATED is also another option)
      patterns: {
        remove: [
          // Removes the datadog agent from the list of bots so it will be
          // considered as ArcjetBotType.LIKELY_NOT_A_BOT
          'datadog agent',
          // Also allow curl clients to pass through. Matches a user agent
          // string with the word "curl" in it
          '^curl',
        ],
      },
    }),
  ],
})

export async function GET(req: Request) {
  const userId = 'user123'
  const decision = await aj.protect(req, { userId })

  if (decision.isDenied() && decision.reason.isBot()) {
    return NextResponse.json(
      { error: 'Bot Detected in request', reason: decision.reason },
      { status: 429 }
    )
  }

  return NextResponse.json({ message: 'OK' })
}
