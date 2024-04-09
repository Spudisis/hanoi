import { NavLink, NavLinkProps } from 'react-router-dom'

import { clsx } from 'clsx'

type LinkProps = NavLinkProps

export const Link = ({ children, className, ...rest }: LinkProps) => {
  return (
    <NavLink className={clsx(className, '')} {...rest}>
      {children}
    </NavLink>
  )
}
