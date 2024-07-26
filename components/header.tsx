import Link from 'next/link'
import { Icons } from './icons'

interface HeaderProps {
  title: string
  docsLink: string
}

const Header: React.FC<HeaderProps> = ({ title, docsLink }) => {
  return (
    <>
      <div className="absolute left-6 top-6">
        <Link href={'/'}>
          <div className="flex text-white">
            <Icons.home className="mr-2 h-6 w-6 text-white" /> Home
          </div>
        </Link>
      </div>
      <div className="px-6 pt-28">
        <h2 className="text-3xl font-extrabold leading-tight tracking-tighter text-white md:text-4xl">
          {title}
        </h2>
        <p className="pt-2 text-lg text-gray-300">
          Read more on the{' '}
          <Link href={docsLink} className="border-b border-gray-300">
            docs
          </Link>
          .
        </p>
        <div className="w-full border-b-2 border-gray-700 pt-8" />
      </div>
    </>
  )
}

export default Header
