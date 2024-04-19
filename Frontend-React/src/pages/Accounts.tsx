import React from 'react';
import ContinueButton from '../components/Buttons/ContinueButton';

interface Accounts {
  heading: string;
  subheading: string;
  AccountTypes: {
    Guest: string;
    Host: string;
  };
}

const Accounts: React.FC = () => {
  const data: Accounts = {
    heading: 'Choose Account Type',
    subheading: 'if you need more information, please check out Help Page',
    AccountTypes:{
      Guest:'Guest',
      Host:'Host'
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-grey'>
      <section className='two-factor-auth p-4 rounded shadow-md bg-white'>
        <div className='w-full max-w-md'>
          <h1 className='text-2xl font-bold mb-4 text-center'>{data.heading}</h1>
          <p className='text-base font-medium mb-2'>{data.subheading}</p>
          <div className='flex justify-between'>
            <ContinueButton text={data.AccountTypes.Guest} />
            <ContinueButton text={data.AccountTypes.Host} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accounts;
