import React, { useState } from 'react'
import ContinueButton from '../components/Buttons/ContinueButton'
import { PiUserLight, PiUsersFourLight } from 'react-icons/pi'

interface Accounts {
  heading: string
  subheading: string
  AccountTypes: {
    Guest: string
    Host: string
  }
}

const AccountsComponent: React.FC = () => {
  const data: Accounts = {
    heading: 'Choose Account Type',
    subheading: 'If you need more information, please check out ',
    AccountTypes: {
      Guest: 'Guest',
      Host: 'Host',
    },
  }

  const [selectedAccountType, setSelectedAccountType] =
    useState<string>('Guest')

  const handleAccountTypeChange = (value: string) => {
    setSelectedAccountType(value)
  }

  const Checkbox: React.FC<{ label: string; value: string }> = ({
    label,
    value,
  }) => {
    const handleOnChange = () => {
      handleAccountTypeChange(value)
    }

    return (
      <label
        htmlFor={value}
        className="checkbox-container flex flex-row-reverse items-center justify-between cursor-pointer"
      >
        <input
          type="radio"
          id={value}
          value={value}
          checked={value === selectedAccountType}
          onChange={handleOnChange}
        />
        <div className="font-medium">{label}</div>
      </label>
    )
  }

  return (
    <div className="flex justify-center items-center h-screen sm:h-[75vh] lg:h-screen">
      <section className="two-factor-auth rounded-lg shadow-md bg-white h-[28rem] w-[min(90%,40rem)] flex flex-col items-center justify-center">
        <div className="w-full sm:w-3/4 sm:mx-auto">
          <h1 className="text-2xl font-bold mb-3 text-center sm:text-3xl">
            {data.heading}
          </h1>
          <p className="text-sm font-medium mb-2 text-center text-neutral-200 w-full px-4 sm:px-0">
            {data.subheading}{' '}
            <a href="#help-page" className="text-primary-100">
              Help Page
            </a>
          </p>
          <div className="flex justify-center">
            <section className="p-5 w-full flex flex-col gap-4">
              <label
                htmlFor={data.AccountTypes.Guest}
                className="bg-[#faf6f6] px-4 py-3 rounded-lg flex gap-3 hover:scale-[1.05] active:scale-[1.03] transition-all cursor-pointer"
              >
                <PiUsersFourLight className="mt-1 text-2xl" />
                <aside className="w-full">
                  <Checkbox label={data.AccountTypes.Guest} value="Guest" />
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    Select if you are attending an event
                  </p>
                </aside>
              </label>
              <label
                htmlFor={data.AccountTypes.Host}
                className="bg-[#faf6f6] px-4 py-3 rounded-lg flex gap-3 hover:scale-[1.05] active:scale-[1.03] transition-all cursor-pointer"
              >
                <PiUserLight className="mt-1 text-2xl" />
                <aside className="w-full">
                  <Checkbox label={data.AccountTypes.Host} value="Host" />
                  <p className="text-sm font-medium text-gray-500 mt-1">
                    Select if you want to create an event
                  </p>
                </aside>
              </label>
            </section>
          </div>
          <div className="flex justify-center mt-4">
            <ContinueButton linkTo={selectedAccountType} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default AccountsComponent
