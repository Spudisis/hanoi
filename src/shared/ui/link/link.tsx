import { NavLink, NavLinkProps } from 'react-router-dom'

import { clsx } from 'clsx'
import { twMerge } from 'tw-merge'

export type LinkProps = NavLinkProps

export const Link = ({ children, className, ...rest }: LinkProps) => {
  return (
    <NavLink className={twMerge(clsx(className, 'font-semibold text-lg transition-all hover:border-b-[1px] hover:border-black'))} {...rest}>
      {children}
    </NavLink>
  )
}
