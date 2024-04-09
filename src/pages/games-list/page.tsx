import { PATHS } from '@/shared/config'
import { Link } from '@/shared/ui'

export const GamesList = () => {
  return (
    <>
      List games <Link to={PATHS.hanoiTower}>Hanoi tower</Link>
    </>
  )
}
