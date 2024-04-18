import logo from '../assets/logo.png';
import SignUpButton from './Buttons/SignUpButton';
import LoginButton from './Buttons/LoginButton';
import NavLinks from './NavLinks';
import { FaBars } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className='bg-white py-6'>
      <section className='w-[90%] flex items-center justify-between m-auto sm:w-[95%] lg:w-[85%]'>
        <button
          type='button'
          className='bg-[#E8EEFF] p-2 rounded-sm border-none outline-none text-primary-100'
        >
          <FaBars />
        </button>
        <img src={logo} alt='Project Logo' className='w-24' />
        <div className='hidden sm:block'>
          <NavLinks />
        </div>
        <div className='items-center gap-x-8 hidden sm:flex'>
          <SignUpButton />
          <LoginButton />
        </div>
      </section>
    </nav>
  );
};
export default Navbar;
