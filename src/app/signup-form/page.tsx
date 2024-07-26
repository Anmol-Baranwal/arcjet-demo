'use client'
import React, { useState, type FormEvent } from 'react'
import Header from '@/components/header'
import { Input } from '@/components/ui/input'
import { Button, buttonVariants } from '@/components/ui/button'

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError(null) // Clear previous errors when a new request starts
    setData('')
    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch('/api/signup-form', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(`${response.status}: ${error.message}`)
      }

      // Handle response if necessary
      const data = await response.json()
      setData(data.message)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Capture the error message to display to the user
      setError(error.message)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="min-h-screen bg-black">
        <Header title="Form Protection Example" docsLink="/docs" />
        <form onSubmit={onSubmit} className="px-6">
          <Input
            type="text"
            defaultValue={'invalid@email'}
            name="email"
            id="email"
            className="my-4 w-60 border-dashed border-white bg-transparent text-white"
          />
          <Button
            type="submit"
            disabled={isLoading}
            className={buttonVariants({ variant: 'primary' })}
          >
            {isLoading ? 'Loading...' : 'Submit Form'}
          </Button>
        </form>
        <div className="px-6 pb-16">
          {data && <div className="py-6 text-green-400">{data}</div>}
          {error && <div className="py-6 text-red-400">{error}</div>}
          <h2 className="mt-6 text-xl font-bold text-white">Test emails</h2>
          <p className="py-4 text-gray-300">
            Email validation 1/3rd of the process. Try these emails to see how
            it works:
          </p>
          <ul className="ms-8 list-outside list-disc">
            <li className="text-gray-400">
              <code className="rounded-md border border-gray-800 bg-transparent p-1 text-gray-400">
                invalid.@arcjet
              </code>{' '}
              – is an invalid email address.
            </li>
            <li className="pt-2 text-gray-400">
              <code className="rounded-md border border-gray-800 bg-transparent p-1 text-gray-400">
                test@0zc7eznv3rsiswlohu.tk
              </code>{' '}
              – is from a disposable email provider.
            </li>
            <li className="pt-2 text-gray-400">
              <code className="rounded-md border border-gray-800 bg-transparent p-1 text-gray-400">
                nonexistent@arcjet.ai
              </code>{' '}
              – is a valid email address & domain, but has no MX records.
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
