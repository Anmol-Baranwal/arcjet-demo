import Header from '@/components/header'

export default async function AttackProtection() {
  return (
    <div className="min-h-screen bg-black">
      <Header
        title="Arcjet Shield Example"
        docsLink="/https://docs.arcjet.com/shield/quick-start/nextjs"
      />
      <div className="px-6 pb-16">
        <h2 className="mt-6 text-xl font-bold text-white">Try it</h2>
        <p className="py-4 text-gray-300">
          Simulate the attack in your terminal using{' '}
          <code className="rounded-md border border-gray-800 bg-transparent p-1 text-gray-400">
            curl
          </code>
          :
        </p>
        <pre className="w-fit rounded-md border border-gray-800 bg-transparent p-4 text-gray-300">
          curl -v -H &quot;x-arcjet-suspicious: true&quot;
          https://arcjet-demo.vercel.app/api/shield
        </pre>
        <p className="py-4 text-gray-300">
          Your IP will be blocked for 60 seconds.
        </p>
      </div>
    </div>
  )
}
