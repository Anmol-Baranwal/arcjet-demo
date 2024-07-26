import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center bg-black pt-28 text-center text-white">
      <h2 className="bg-gradient-to-r from-[#A855F7] to-[#D9ACF5] bg-clip-text pb-2 text-3xl font-bold tracking-tighter text-transparent sm:text-4xl xl:text-5xl/none">
        Demo of core features of Arcjet
      </h2>
      <p className="tracking-tigher px-2 pt-6 text-lg leading-8 text-gray-300 lg:px-72">
        The only security layer that your app will ever need. <br />
        Find the code on{' '}
        <span className="border-b">
          <Link
            href={'https://github.com/Anmol-Baranwal/arcjet-demo'}
            target="_blank"
          >
            GitHub
          </Link>
        </span>
        .
      </p>
      <div className="flex gap-4 pt-12">
        <Link
          href="/signup-form"
          className={buttonVariants({ variant: 'primary' })}
        >
          Signup form protection
        </Link>
        <Link
          href="/bots-protection"
          className={buttonVariants({ variant: 'primary' })}
        >
          Bot protection
        </Link>
        <Link
          href="/rate-limiting"
          className={buttonVariants({ variant: 'primary' })}
        >
          Rate limiting
        </Link>
        <Link
          href="/attack-protection"
          className={buttonVariants({ variant: 'primary' })}
        >
          Attack protection
        </Link>
      </div>
    </div>
  )
}
