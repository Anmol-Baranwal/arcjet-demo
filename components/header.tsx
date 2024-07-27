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
        <div className="flex items-center justify-center">
          <div className="flex">
            <Link href={'/'}>
              <div className="flex items-center justify-center text-white">
                <Icons.home className="mr-2 h-4 w-4 text-white" /> Home
              </div>
            </Link>
          </div>
          <div className="mx-4 h-8 w-[1px] bg-white/25"></div>
          <div className="flex pl-0">
            <Link href={'https://twitter.com/Anmol_Codes'}>
              <div className="flex items-center justify-center text-white">
                <Icons.X className="mr-2 h-4 w-4 text-white" /> Made by Anmol
              </div>
            </Link>
          </div>
        </div>
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
