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
    <div>
      <h1>{data.heading}</h1>
      <h2>{data.subheading}</h2>
      <p>{data.AccountTypes.Guest}</p>
      <p>{data.AccountTypes.Host}</p>
      <ContinueButton />
      
    </div>
  );
};

export default Accounts;
