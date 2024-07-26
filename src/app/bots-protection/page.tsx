import Header from '@/components/header'

export default async function BotsProtection() {
  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Bot Protection Example"
        docsLink="/https://docs.arcjet.com/bot-protection/quick-start/nextjs"
      />
      <div className="px-6 pb-16">
        <h2 className="mt-6 text-xl font-bold text-white">Try it</h2>
        <p className="py-4 text-gray-300">
          Write below command in your terminal using{' '}
          <code className="rounded-md border border-gray-800 bg-transparent p-1 text-gray-400">
            curl
          </code>
          , which is considered an automated client:
        </p>
        <pre className="w-fit rounded-md border border-gray-800 bg-transparent p-4 text-gray-300">
          curl -v https://arcjet-demo.vercel.app/api/bot-protection
        </pre>
        <p className="py-4 text-gray-300">
          Your IP will be blocked for 60 seconds.
        </p>
      </div>
    </div>
  )
}
