import uploadImgIcon from '../assets/Group 26.png'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Country, State, City } from 'country-state-city'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {
  const initialEventInfo = {
    eventName: '',
    firstName: '',
    eventDate: '',
    eventTime: '',
    country: 'AF',
    state: 'BDS',
    city: 'Badakhstan',
    street: '',
    imageSelected: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    twitter: '',
  }

  const [selectedImage, setSelectedImage] = useState('')
  const [imageUploadedMsg, setImageUploadedMsg] = useState('')
  const [eventInfo, setEventInfo] = useState(initialEventInfo)

  const navigate = useNavigate()
  const submitForm = () => navigate('/createeventmessage')

  const fileSelectHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const value = URL.createObjectURL(e.target.files[0])
    setSelectedImage(value)
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setEventInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(eventInfo)
    submitForm()
  }

  const handleSubmitImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEventInfo((prev) => ({ ...prev, imageSelected: selectedImage }))
    setImageUploadedMsg('Uploaded. Click the image to select a different image')
  }

  return (
    <div className="text-center bg-white pb-24">
      <section className="pt-8 text-center">
        <h1 className="font-bold text-3xl">Create Event</h1>
        <p className="font-medium text-base text-neutral-200 mt-1 border-b-2 border-b-neutral-200 w-[90%] pt-3 mx-auto pb-3 mb-6 sm:w-4/5 lg:w-3/5">
          Craft your event and indulge in a refreshing new approach to register
          your event
        </p>
      </section>
      <div className=" w-full mx-auto lg:w-[70%]">
        <section className=" mt-8 items-center w-[90%] mx-auto lg:w-[65%]">
          <p className="text-neutral-200 text-sm font-medium">
            Upload an image about your event such as event poster. It must be
            1:1 or square in size.
          </p>

          <form className=" " onSubmit={handleSubmitImage}>
            <div className="border-2 border-dashed rounded-xl border-black/30 mt-8 text-center w-52 h-52 mx-auto">
              <label
                htmlFor="eventimage"
                className="w-full h-full cursor-pointer flex items-center justify-center"
              >
                <img
                  src={selectedImage ? selectedImage : uploadImgIcon}
                  alt="Image upload"
                  className="w-4/5 h-4/5 rounded-xl"
                />
              </label>
              <input
                type="file"
                id="eventimage"
                name="eventimage"
                onChange={fileSelectHandleChange}
                className=" hidden"
                required
              />
            </div>
            <p>{imageUploadedMsg}</p>
            <button
              type="submit"
              className="w-52 bg-primary-100 py-2 text-white font-medium mt-5 rounded-lg text-base hover:bg-primary-200 transition-all"
            >
              Upload Image
            </button>
          </form>
        </section>

        <section className="border-2 border-dashed rounded-xl border-black/30 my-10 py-6 w-[90%] mx-auto px-5 text-start sm:px-12 sm:py-12 lg:w-[75%]">
          <h1 className="font-bold mb-1 text-xl">General Information</h1>
          <p className="text-neutral-200 text-base font-medium">
            The essential details regarding your event, encompassing its
            location and additional information
          </p>
          <form
            id="eventInfoForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="mt-7 flex flex-col gap-5 sm:flex-row">
              <label
                htmlFor="eventName"
                className="flex flex-col gap-1 sm:w-1/2"
              >
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Event Name <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="eventName"
                  placeholder="Event name"
                  value={eventInfo.eventName}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
              <label
                htmlFor="firstName"
                className="flex flex-col gap-1 sm:w-1/2"
              >
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  First Name <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={eventInfo.firstName}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
            </div>

            <div className="mt-7 flex flex-col gap-5 sm:flex-row">
              <label
                htmlFor="eventDate"
                className="flex flex-col gap-1 sm:w-1/2"
              >
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Event Date <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="date"
                  name="eventDate"
                  value={eventInfo.eventDate}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
              <label
                htmlFor="eventTime"
                className="flex flex-col gap-1 sm:w-1/2"
              >
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Time of Event{' '}
                  <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="time"
                  name="eventTime"
                  value={eventInfo.eventTime}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-3">
              <label htmlFor="country" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Country <span className="text-red-600 font-bold">*</span>
                </p>

                <select
                  name="country"
                  title="Countries"
                  onChange={handleChange}
                  required
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-2 py-3 text-sm text-neutral-200 font-medium"
                >
                  {Country.getAllCountries().map((option, index) => {
                    return (
                      <option key={index} value={option.isoCode}>
                        {option.name}
                      </option>
                    )
                  })}
                </select>
              </label>
              <label htmlFor="state" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  State <span className="text-red-600 font-bold">*</span>
                </p>
                <select
                  name="state"
                  title="States"
                  onChange={handleChange}
                  required
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-2 py-3 text-sm text-neutral-200 font-medium"
                >
                  {State.getStatesOfCountry(eventInfo.country).map(
                    (option, index) => {
                      return (
                        <option key={index} value={option.isoCode}>
                          {option.name}
                        </option>
                      )
                    },
                  )}
                </select>
              </label>

              <label htmlFor="city" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  City <span className="text-red-600 font-bold">*</span>
                </p>
                <select
                  name="city"
                  title="Cities"
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-2 py-3 text-sm text-neutral-200 font-medium"
                >
                  {City.getCitiesOfState(
                    eventInfo.country,
                    eventInfo.state,
                  ).map((option, index) => {
                    return (
                      <option key={index} value={option.name}>
                        {option.name}
                      </option>
                    )
                  })}
                </select>
              </label>
            </div>

            <div className="mt-7 w-full gap-5">
              <label htmlFor="street" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Street <span className="text-red-600 font-bold">*</span>
                </p>
                <p className="text-sm mt-1 text-neutral-200 mb-1">
                  Enter the street address below
                </p>
                <input
                  type="address"
                  name="street"
                  placeholder="e.g Dallas, Texas"
                  value={eventInfo.street}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
            </div>
            <section className="text-start border-t-2 border-dashed border-black/30 mt-12 pt-12">
              <h1 className="font-bold mb-1 text-xl">Social Media Accounts</h1>
              <p className="text-neutral-200 text-base font-medium">
                Fill in your social information.
              </p>
              <div className="mt-7 grid gap-5 mb-7 sm:grid-cols-2">
                <label htmlFor="linkedin" className="flex flex-col gap-1">
                  <p className="flex gap-1 text-sm font-medium text-neutral-200">
                    Linkedin <span className="text-red-600 font-bold">*</span>
                  </p>
                  <input
                    type="text"
                    name="linkedin"
                    placeholder="Your linkedin link"
                    value={eventInfo.linkedin}
                    onChange={handleChange}
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                    required
                  />
                </label>
                <label htmlFor="instagram" className="flex flex-col gap-1">
                  <p className="flex gap-1 text-sm font-medium text-neutral-200">
                    Instagram
                  </p>
                  <input
                    type="text"
                    name="instagram"
                    placeholder="Your instagram link"
                    value={eventInfo.instagram}
                    onChange={handleChange}
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  />
                </label>
              </div>

              <div className="mt-2 grid gap-5 sm:grid-cols-2">
                <label htmlFor="facebook" className="flex flex-col gap-1">
                  <p className="flex gap-1 text-sm font-medium text-neutral-200">
                    Facebook
                  </p>
                  <input
                    type="text"
                    name="facebook"
                    placeholder="Your facebook"
                    value={eventInfo.facebook}
                    onChange={handleChange}
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  />
                </label>
                <label htmlFor="twitter" className="flex flex-col gap-1">
                  <p className="flex gap-1 text-sm font-medium text-neutral-200">
                    Twitter
                  </p>
                  <input
                    type="text"
                    name="twitter"
                    placeholder="Your twitter link"
                    value={eventInfo.twitter}
                    onChange={handleChange}
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  />
                </label>
              </div>
            </section>
          </form>
        </section>
      </div>

      <section className="flex items-center justify-end w-[90%] mx-auto lg:w-[53%]">
        <button
          type="submit"
          form="eventInfoForm"
          className="flex items-center gap-3 text-white bg-primary-100 font-medium border border-primary-100 text-sm py-2 px-4 rounded-md group"
        >
          Submit
          <FaArrowRight className=" group-hover:translate-x-1 transition-all hidden sm:block" />
        </button>
      </section>
    </div>
  )
}
export default CreateEvent
