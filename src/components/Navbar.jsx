import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex flex-row gap-5 place-content-evenly'>
      <NavLink to='/'>
        Home
      </NavLink>
      <NavLink to='/pastes'>
        Logs
      </NavLink>
    </div>
  )
}

export default Navbar
