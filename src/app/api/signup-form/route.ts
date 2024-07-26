import arcjet, { protectSignup } from '@arcjet/next'
import { NextResponse } from 'next/server'

const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Get your site key from https://app.arcjet.com
  rules: [
    protectSignup({
      email: {
        mode: 'LIVE', // will block requests. Use "DRY_RUN" to log only
        // Block emails that are disposable, invalid, or have no MX records
        block: ['DISPOSABLE', 'INVALID', 'NO_MX_RECORDS'], // See https://docs.arcjet.com/email-validation/concepts#email-types
      },
      bots: {
        mode: 'LIVE',
        // Block clients that we are sure are automated
        block: ['AUTOMATED'],
      },
      // It would be unusual for a form to be submitted more than 5 times in 5
      // minutes from the same IP address
      rateLimit: {
        // uses a sliding window rate limit
        mode: 'LIVE',
        interval: '5m', // counts requests over a 10 minute sliding window
        max: 5, // allows 15 submissions within the window
      },
    }),
  ],
})

export async function POST(req: Request) {
  const data = await req.json()
  const email = data.email

  const decision = await aj.protect(req, {
    email,
  })

  console.log('Arcjet decision: ', decision)

  if (decision.isDenied()) {
    let message = 'Request cannot be allowed.'

    if (decision.reason.isEmail()) {
      if (decision.reason.emailTypes.includes('INVALID')) {
        message = 'Email address is invalid.'
      } else if (decision.reason.emailTypes.includes('DISPOSABLE')) {
        message = 'Disposable email addresses are not allowed.'
      } else if (decision.reason.emailTypes.includes('NO_MX_RECORDS')) {
        message =
          'Your email domain does not have an MX record. Please check for any typos!!'
      }
    } else if (decision.reason.isRateLimit()) {
      const reset = decision.reason.resetTime

      if (reset === undefined) {
        message = 'Too many requests. Please try again later.'
      } else {
        // no of seconds between reset Date and now
        const seconds = Math.floor((reset.getTime() - Date.now()) / 1000)
        const minutes = Math.ceil(seconds / 60)

        if (minutes > 1) {
          message = `Too many requests. Please try again in ${minutes} minutes.`
        } else {
          message = `Too many requests. Please try again in ${seconds} seconds.`
        }
      }
    } else {
      message = 'Forbidden'
    }

    // if (decision.ip.hasCountry()) {
    //   message += ` PS: Hello from ${decision.ip.country}.`
    // }

    return NextResponse.json(
      { message, reason: decision.reason },
      { status: decision.reason.isRateLimit() ? 429 : 400 }
    )
  }

  return NextResponse.json({ message: 'Email is Valid and has MX Records' })
}
