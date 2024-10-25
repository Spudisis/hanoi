import { clsx } from 'clsx'

import { Link, LinkProps } from '@/shared/ui'

type ItemGame = LinkProps

export const ItemGame = ({ children, className, ...rest }: ItemGame) => {
  return (
    <Link {...rest} className={clsx(className, 'p-4 border-black border rounded-md text-center hover:text-gray-600 hover:border-gray-600')}>
      {children}
    </Link>
  )
}
