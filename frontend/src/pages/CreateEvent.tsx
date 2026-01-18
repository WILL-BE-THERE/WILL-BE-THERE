import { ChangeEvent, FormEvent, useState } from 'react'
import { Country, State, City } from 'country-state-city'
import { FaArrowRight } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import SocialMediaInputs from '../components/CreateEvent/SocialMediaInputs'
import ImageUploadSection from '../components/CreateEvent/ImageUploadSection'
import axios from 'axios'
import API_ENDPOINTS from '../config/api'
import generateApiHeaders from './Headers'

const CreateEvent = () => {
  const initialEventInfo = {
    eventName: '',
    generalInfo: '',
    dateOfEvent: '',
    eventClosingDate: '',
    time: '',
    country: 'AF',
    state: 'BDS',
    city: 'Badakhstan',
    street: '',
    imageSelected: null as File | null,
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
    if (!e.target.files || e.target.files.length === 0) return
    const file = e.target.files[0]
    if (!file.type || !file.type.startsWith('image/')) {
      return
    }
    setEventInfo(prev => ({ ...prev, imageSelected: file }))
    setSelectedImage(URL.createObjectURL(file))
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setEventInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('eventName', eventInfo.eventName)
    formData.append('generalInfo', eventInfo.generalInfo)
    formData.append('dateOfEvent', eventInfo.dateOfEvent)
    formData.append('eventClosingDate', eventInfo.eventClosingDate)
    formData.append('time', eventInfo.time)
    formData.append('country', eventInfo.country)
    formData.append('state', eventInfo.state)
    formData.append('city', eventInfo.city)
    formData.append('street', eventInfo.street)
    formData.append('instagram', eventInfo.instagram)
    formData.append('facebook', eventInfo.facebook)
    formData.append('twitter', eventInfo.twitter)
    formData.append('linkedIn', eventInfo.linkedin)

    if (eventInfo.imageSelected) {
      formData.append('picture', eventInfo.imageSelected)
    }

    try {
      await axios.post(API_ENDPOINTS.EVENTS.CREATE, formData, {
        headers: {
          ...generateApiHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      })
      submitForm()
    } catch (error) {
      console.error('Error creating event:', error)
      alert('Failed to create event. Please check your inputs.')
    }
  }

  const handleSubmitImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setImageUploadedMsg('Image ready for upload with event.')
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
        <ImageUploadSection
          selectedImage={selectedImage}
          imageUploadedMsg={imageUploadedMsg}
          handleSubmitImage={handleSubmitImage}
          fileSelectHandleChange={fileSelectHandleChange}
        />

        <section className="border-2 border-dashed rounded-xl border-black/30 my-10 py-6 w-[90%] mx-auto px-5 text-start sm:px-12 sm:py-12 lg:w-[75%]">
          <h1 className="font-bold mb-1 text-xl">General Information</h1>
          <p className="text-neutral-200 text-base font-medium">
            The essential details regarding your event, encompassing its
            location and additional information
          </p>
          <form
            id="eventInfoForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 mt-7"
          >
            <label htmlFor="eventName" className="flex flex-col gap-1 w-full">
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

            <label htmlFor="generalInfo" className="flex flex-col gap-1 w-full mt-4">
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Description <span className="text-red-600 font-bold">*</span>
              </p>
              <textarea
                name="generalInfo"
                placeholder="Tell us about your event..."
                value={eventInfo.generalInfo}
                onChange={handleChange}
                className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full h-32 resize-none"
                required
              />
            </label>

            <div className="flex flex-col gap-5 sm:flex-row mt-4">
              <label htmlFor="dateOfEvent" className="flex flex-col gap-1 sm:w-1/3">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Event Date <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="date"
                  name="dateOfEvent"
                  value={eventInfo.dateOfEvent}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
              <label htmlFor="eventClosingDate" className="flex flex-col gap-1 sm:w-1/3">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Closing Date <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="date"
                  name="eventClosingDate"
                  value={eventInfo.eventClosingDate}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
              <label htmlFor="time" className="flex flex-col gap-1 sm:w-1/3">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Time <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="time"
                  name="time"
                  value={eventInfo.time}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-3 mt-4">
              <label htmlFor="country" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Country <span className="text-red-600 font-bold">*</span>
                </p>
                <select
                  name="country"
                  value={eventInfo.country}
                  onChange={handleChange}
                  required
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-2 py-3 text-sm text-neutral-200 font-medium"
                >
                  {Country.getAllCountries().map((option) => (
                    <option key={option.isoCode} value={option.isoCode}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="state" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  State <span className="text-red-600 font-bold">*</span>
                </p>
                <select
                  name="state"
                  value={eventInfo.state}
                  onChange={handleChange}
                  required
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-2 py-3 text-sm text-neutral-200 font-medium"
                >
                  {State.getStatesOfCountry(eventInfo.country).map((option) => (
                    <option key={option.isoCode} value={option.isoCode}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>
              <label htmlFor="city" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  City <span className="text-red-600 font-bold">*</span>
                </p>
                <select
                  name="city"
                  value={eventInfo.city}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-2 py-3 text-sm text-neutral-200 font-medium"
                >
                  {City.getCitiesOfState(eventInfo.country, eventInfo.state).map((option) => (
                    <option key={option.name} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label htmlFor="street" className="flex flex-col gap-1 mt-4">
              <p className="flex gap-1 text-sm font-medium text-neutral-200">
                Street Address <span className="text-red-600 font-bold">*</span>
              </p>
              <input
                type="text"
                name="street"
                placeholder="e.g 123 Event Lane"
                value={eventInfo.street}
                onChange={handleChange}
                className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                required
              />
            </label>

            <SocialMediaInputs eventInfo={eventInfo} handleChange={handleChange} />
          </form>
        </section>
      </div>

      <section className="flex items-center justify-end w-[90%] mx-auto lg:w-[53%]">
        <button
          type="submit"
          form="eventInfoForm"
          className="flex items-center gap-3 text-white bg-primary-100 font-medium border border-primary-100 text-sm py-2 px-4 rounded-md group"
        >
          Create Event
          <FaArrowRight className=" group-hover:translate-x-1 transition-all hidden sm:block" />
        </button>
      </section>
    </div>
  )
}
export default CreateEvent
