import React, { useState } from 'react';
import ContinueButton from '../components/Buttons/ContinueButton';

interface Accounts {
  heading: string;
  subheading: string;
  AccountTypes: {
    Guest: string;
    Host: string;
  };
}

const AccountsComponent: React.FC = () => {
  const data: Accounts = {
    heading: 'Choose Account Type',
    subheading: 'If you need more information, please check out the Help Page',
    AccountTypes: {
      Guest: 'Guest',
      Host: 'Host',
    },
  };

  const [selectedAccountType, setSelectedAccountType] = useState<string | null>(null);

  const handleAccountTypeChange = (value: string) => {
    setSelectedAccountType(value);
  };

  const Checkbox: React.FC<{ label: string; value: string }> = ({ label, value }) => {
    const handleOnChange = () => {
      handleAccountTypeChange(value);
    };

    return (
      <div className='checkbox-container flex items-center'>
        <input
          type='radio'
          id={value}
          value={value}
          checked={value === selectedAccountType}
          onChange={handleOnChange}
          className='mr-2'
        />
        <label htmlFor={value}>{label}</label>
      </div>
    );
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gray-200'>
      <section className='two-factor-auth p-4 rounded shadow-md bg-white'>
        <div className='w-full max-w-md'>
          <h1 className='text-2xl font-bold mb-4 text-center'>{data.heading}</h1>
          <p className='text-base font-medium mb-2'>{data.subheading}</p>
          <div className='flex justify-center'>
            <section >
              <div className='mt-3 '>
                <Checkbox label={data.AccountTypes.Guest} value='Guest' />
                <p className='text-sm text-gray-500'>Select if you are attending an event</p>
              </div>
              <div className='mt-5'>
                <Checkbox label={data.AccountTypes.Host} value='Host' />
                <p className='text-sm text-gray-500'>Select if a host creating event</p>
              </div>
              </section>
          </div>
          <div className='flex justify-center mt-4'>
            <ContinueButton />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AccountsComponent;
