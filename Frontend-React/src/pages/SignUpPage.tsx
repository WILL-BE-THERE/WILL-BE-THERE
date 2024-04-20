import { Link } from 'react-router-dom';
import shape1 from '../assets/shape1.png';
import shape2 from '../assets/shape2.png';
import shape3 from '../assets/shape3.png';
import googleIcon from '../assets/google-icon.png';
import appleIcon from '../assets/apple-icon.png';
import fbIcon from '../assets/fb-icon.png';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { ChangeEvent, FormEvent, useState } from 'react';

const SignUpPage = () => {
  const initialDetails = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  // const errorMessages ={
  //   emailError:'',
  //   passwordError:'',
  //   confirmPasswordError:''
  // }

  const [seePassword, setSeePassword] = useState(false);
  const [seeConfirmPassword, setSeeConfirmPassword] = useState(false);
  const [userInfo, setUserInfo] = useState(initialDetails);
  const [errors, setErrors] = useState(false);
  const [passErrors, setPassErrors] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim;
  const passRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,16}$/;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      userInfo.email.match(emailRegex) &&
      userInfo.firstName &&
      userInfo.lastName &&
      userInfo.password.match(passRegex) &&
      userInfo.confirmPassword.match(passRegex)
    )
      setUserInfo(initialDetails);

    if (!emailRegex.test(userInfo.email)) {
      setErrors(true);
    } else {
      setErrors(false);
    }

    if (!passRegex.test(userInfo.password)) {
      setPassErrors(true);
    } else {
      setPassErrors(false);
    }

    setSeePassword(false);
    setSeeConfirmPassword(false);
  };

  return (
    <section className='h-[50rem] w-full bg-white relative flex'>
      <img
        src={shape1}
        alt='icon'
        className='absolute right-0 top-1/2 -translate-y-1/2 w-36 hidden sm:block'
      />
      <img
        src={shape2}
        alt='icon'
        className='absolute -bottom-6 left-1/2 -translate-x-1/2 w-44 hidden sm:block'
      />
      <img
        src={shape3}
        alt='icon'
        className='absolute left-[22%] top-1/2 -translate-y-1/2 -translate-x-[22%] w-52 hidden sm:block'
      />
      <aside className='bg-primary-100/[50%] w-1/2 h-full relative z-[2] backdrop-filter backdrop-blur-[15px] place-items-center hidden sm:grid'>
        <div className='w-[55%] h-fit text-white text-center lg:w-[35%]'>
          <h1 className='text-3xl mb-2 font-bold'>Welcome back!</h1>
          <p className='text-sm mb-8 font-light'>
            To stay in the loop please Login with your personal info.
          </p>
          <Link
            to='/login'
            className='text-sm px-5 py-2 font-light border-2 border-white/30 rounded-md hover:bg-primary-200 hover:text-white transition-all'
          >
            Login
          </Link>
        </div>
      </aside>

      <div className='w-full h-full sm:w-1/2'>
        <form
          className='w-[80%] ml-[3rem] mt-20 flex flex-col gap-6 lg:ml-[6.8rem] lg:w-[65%] relative z-10'
          onSubmit={handleSubmit}
        >
          <h1 className='text-3xl mb-2 font-bold lg:text-4xl'>
            Create your account
          </h1>
          <div className='flex gap-3 w-full'>
            <label htmlFor='firstName' className='flex flex-col gap-1 w-1/2'>
              <p className='flex gap-1 text-sm font-medium text-neutral-200'>
                First Name <span className='text-red-600 font-bold'>*</span>
              </p>
              <input
                type='text'
                name='firstName'
                value={userInfo.firstName}
                onChange={handleChange}
                className='border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full'
                // required
              />
            </label>
            {}

            <label htmlFor='lastName' className='flex flex-col gap-1 w-1/2'>
              <p className='flex gap-1 text-sm font-medium text-neutral-200'>
                Last Name <span className='text-red-600 font-bold'>*</span>
              </p>
              <input
                type='text'
                name='lastName'
                value={userInfo.lastName}
                onChange={handleChange}
                className='border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full'
                // required
              />
            </label>
          </div>

          <label htmlFor='Email' className='flex flex-col gap-1 w-full'>
            <p className='flex gap-1 text-sm font-medium text-neutral-200'>
              Email <span className='text-red-600 font-bold'>*</span>
            </p>
            <input
              type='text'
              name='email'
              value={userInfo.email}
              onChange={handleChange}
              className={`border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] ${
                errors ? 'focus:outline-red-600' : 'focus:outline-primary-100'
              } rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full`}
              // required
            />
            {errors && (
              <p className='text-red-600 text-xs'>Enter valid email</p>
            )}
          </label>

          <label
            htmlFor='Enter Password'
            className='flex flex-col gap-1 w-full'
          >
            <p className='flex gap-1 text-sm font-medium text-neutral-200'>
              Enter Password <span className='text-red-600 font-bold'>*</span>
            </p>
            <aside className='relative flex'>
              <input
                type={seePassword ? 'text' : 'password'}
                name='password'
                value={userInfo.password}
                onChange={handleChange}
                className='border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full'
                // required
              />
              <button
                type='button'
                className='absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none'
                onClick={() => setSeePassword(!seePassword)}
              >
                {seePassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </aside>
            {passErrors && (
              <p className='text-red-600 text-xs'>
                Password must be 8 characters long containing at least 1
                uppercase, 1 lowercase, 1 special character, and 1 number
              </p>
            )}
          </label>

          <label
            htmlFor='Confirm Password'
            className='flex flex-col gap-1 w-full'
          >
            <p className='flex gap-1 text-sm font-medium text-neutral-200'>
              Confirm Password <span className='text-red-600 font-bold'>*</span>
            </p>
            <aside className='relative flex'>
              <input
                type={seeConfirmPassword ? 'text' : 'password'}
                name='confirmPassword'
                value={userInfo.confirmPassword}
                onChange={handleChange}
                className='border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 placeholder:text-sm w-full'
                // required
              />
              <button
                type='button'
                className='absolute right-5 top-1/2 -translate-y-1/2 border-none outline-none'
                onClick={() => setSeeConfirmPassword(!seeConfirmPassword)}
              >
                {seeConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </aside>
            {userInfo.password !== userInfo.confirmPassword && (
              <p className='text-red-600 text-xs'>Password doesn't match</p>
            )}
          </label>

          <div className='w-full flex items-center justify-center'>
            <button
              type='submit'
              className='px-5 py-2 rounded-md bg-primary-100 text-white text-sm border-none outline-none hover:scale-110 active:scale-105 w-fit transition-all'
            >
              Sign Up
            </button>
          </div>

          <p className='text-center'>or signup via</p>

          <div className='flex w-full items-center justify-center gap-6'>
            <a href='#'>
              <img src={googleIcon} alt='google icon' className='w-6' />
            </a>
            <a href='#'>
              <img src={appleIcon} alt='apple icon' className='w-6' />
            </a>
            <a href='#'>
              <img src={fbIcon} alt='facebook icon' className='w-6' />
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};
export default SignUpPage;
