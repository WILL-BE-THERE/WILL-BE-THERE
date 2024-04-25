import { ChangeEvent, FormEvent, useState } from 'react'
import CreateEventsHeader from '../../src/components/CreateEventsHeader'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

const CreateEventPayInfo = () => {
  const initialPaymentInfo = {
    bankName: '',
    accountName: '',
    accountNumber: '',
  }

  const [paymentInfo, setPaymentInfo] = useState(initialPaymentInfo)

  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const next = () => navigate('/createeventsocials')
  const location = useLocation()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(paymentInfo)
    next()
  }

  return (
    <div className="text-center bg-white pb-24">
      <div className="w-[70%] mx-auto">
        <CreateEventsHeader textColor={location.pathname} />

        <section className="border-2 border-dashed rounded-xl border-black/30 my-10 py-12 w-[75%] mx-auto px-12 text-start">
          <h1 className="font-bold mb-1 text-xl">Banking Information</h1>
          <p className="text-neutral-200 text-base font-medium">
            Fill in your banking information.
          </p>
          <form
            id="paymentInfoForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="mt-7">
              <label htmlFor="bankName" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Bank Name <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="bankName"
                  placeholder="Your bank name"
                  value={paymentInfo.bankName}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
            </div>

            <div className="mt-2">
              <label htmlFor="accountNumber" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Account Number{' '}
                  <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Your account number"
                  value={paymentInfo.accountNumber}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
            </div>

            <div className="mt-2">
              <label htmlFor="accountName" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Account Name <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="accountName"
                  placeholder="Your account name"
                  value={paymentInfo.accountName}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
            </div>
          </form>
        </section>

        <section className="flex items-center justify-between w-3/4 mx-auto">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-3 text-neutral-200 font-medium bg-transparent border border-neutral-400 text-sm py-2 px-4 rounded-md group"
          >
            <FaArrowLeft className=" group-hover:-translate-x-1 transition-all hidden sm:block" />
            Back
          </button>
          <button
            type="submit"
            form="paymentInfoForm"
            className="flex items-center gap-3 text-white bg-primary-100 font-medium border border-primary-100 text-sm py-2 px-4 rounded-md group"
          >
            Next
            <FaArrowRight className=" group-hover:translate-x-1 transition-all hidden sm:block" />
          </button>
        </section>
      </div>
    </div>
  )
}

export default CreateEventPayInfo
