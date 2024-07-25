import Link from 'next/link'
import GitHubCornerEffect from '@/components/github-corner-effect'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center bg-black pt-28 text-center text-white">
      <h2 className="bg-gradient-to-r from-[#A855F7] to-[#D9ACF5] bg-clip-text pb-2 text-3xl font-bold tracking-tighter text-transparent sm:text-4xl xl:text-5xl/none">
        Demo of core features of Arcjet
      </h2>
      <p className="tracking-tigher px-2 pt-6 text-lg leading-8 text-gray-300 lg:px-72">
        The only security layer that your app will ever need. <br />
        Find the code on{' '}
        <span className="[#D9ACF5] border-b">
          <Link
            href={'https://github.com/Anmol-Baranwal/arcjet-demo'}
            target="_blank"
          >
            GitHub
          </Link>
        </span>
        .
      </p>
      <GitHubCornerEffect />
    </div>
  )
}
