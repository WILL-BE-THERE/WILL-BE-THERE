import { NavLink } from 'react-router-dom';

const menuData = [
  { title: 'Home', link: '/' },
  { title: 'Events', link: 'events' },
  { title: 'About', link: 'about' },
  { title: 'Contact', link: 'contact' },
  { title: 'FAQs', link: 'faqs' },
];

const NavLinks = () => {
  return (
    <ul className='flex items-center gap-8 text-[0.95rem]'>
      {menuData.map((item, i) => (
        <li>
          <NavLink
            to={item.link}
            key={i}
            className={`${(isActive: boolean) => {
              return isActive ? 'active' : '';
            }} text-neutral-200`}
          >
            {item.title}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
export default NavLinks;
