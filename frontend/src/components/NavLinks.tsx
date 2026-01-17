import { NavLink } from 'react-router-dom'
import { menuData } from '../utils/local-data'

const NavLinks = () => {
  return (
    <ul className="navlinks flex items-center gap-8 text-[0.95rem] font-medium">
      {menuData.map((item, i) => (
        <li key={i}>
          <NavLink
            to={item.link}
            className={`${(isActive: boolean) => {
              return isActive ? 'active' : ''
            }} text-neutral-200`}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
export default NavLinks
