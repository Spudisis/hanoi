import { PATHS } from '@/shared/config'
import { Link } from '@/shared/ui'

export const Header = () => {
  return (
    <header className='mx-auto my-0 w-full flex justify-center border border-b-[1px] p-4 border-black'>
      <div className='max-w-container w-full flex flex-row justify-between'>
        Lorem
        <nav>
          <Link to={PATHS.games}>Games</Link>
        </nav>
        <div>lorem</div>
      </div>
    </header>
  )
}
