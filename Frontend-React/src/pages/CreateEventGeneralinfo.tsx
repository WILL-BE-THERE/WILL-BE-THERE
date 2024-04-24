import axios from 'axios'
import CreateEventsHeader from '../../src/components/CreateEventsHeader'
import uploadImgIcon from '../assets/Group 26.png'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'
import Select, { StylesConfig } from 'react-select'

const countriesApi =
  'https://valid.layercode.workers.dev/list/countries?format=select&flags=true&value=code'
// const stateApiByCountryUrl =
//   'https://countriesnow.space/api/v0.1/countries/states?format=select'
// const cityByStateURL =
//   'https://countriesnow.space/api/v0.1/countries/state/cities'

const CreateEvent = () => {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState({})

  // const [states, setStates] = useState([])
  // const [selectedstates, setSelectedstates] = useState({})

  // const [city, setCity] = useState([])
  // const [selectedcity, setSelectedcity] = useState({})

  const fetchCountries = async () => {
    try {
      const response = await axios.get(countriesApi)
      setCountries(response.data?.countries)
      setSelectedCountry(response.data?.userSelectValue)
      console.log(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  const initialEventInfo = {
    eventName: '',
    firstName: '',
    eventDate: '',
    eventTime: '',
    country: '',
    state: '',
    city: '',
    street: '',
    imageSelected: '',
  }

  const [selectedImage, setSelectedImage] = useState('')
  const [imageUploadedMsg, setImageUploadedMsg] = useState('')
  const [eventInfo, setEventInfo] = useState(initialEventInfo)

  const navigate = useNavigate()
  const next = () => navigate('/createeventpayinfo')
  const location = useLocation()

  const colourStyles: StylesConfig = {
    control: (styles) => ({
      ...styles,
      background: '#fafafa',
      color: '#5E5C5C',
      border: '1.5px solid #d6d6d6',
      borderRadius: '0.375rem',
      fontSize: '0.875rem',
      padding: '0.3rem 0.4rem',
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: '500',
    }),
  }

  const fileSelectHandleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const value = URL.createObjectURL(e.target.files[0])
    setSelectedImage(value)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEventInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(eventInfo)
    next()
  }

  const handleSubmitImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEventInfo((prev) => ({ ...prev, imageSelected: selectedImage }))
    setImageUploadedMsg('Uploaded. Click the image to select a different image')
  }

  return (
    <div className="text-center bg-white pb-24">
      <div className=" w-[70%] mx-auto">
        <CreateEventsHeader textColor={location.pathname} />

        <section className=" mt-8 items-center w-[65%] mx-auto">
          <h1 className="font-bold mb-1 text-xl">Event Image</h1>
          <p className="text-neutral-200 text-base font-medium">
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

        <section className="border-2 border-dashed rounded-xl border-black/30 my-10 py-12 w-[75%] mx-auto px-12 text-start">
          <h1 className="font-bold mb-1 text-xl">General Information</h1>
          <p className="text-neutral-200 text-base font-medium">
            The essential details regarding your event, encompassing its
            location and additional information
          </p>
          <form
            id="generalInfoForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="mt-7 flex gap-5">
              <label htmlFor="eventName" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Name <span className="text-red-600 font-bold">*</span>
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
              <label htmlFor="firstName" className="flex flex-col gap-1 w-1/2">
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

            <div className="mt-7 flex gap-5">
              <label htmlFor="eventDate" className="flex flex-col gap-1 w-1/2">
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
              <label htmlFor="eventTime" className="flex flex-col gap-1 w-1/2">
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

            <div className="mt-7 flex gap-5">
              <label htmlFor="country" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Country <span className="text-red-600 font-bold">*</span>
                </p>
                <Select
                  className="w-full text-sm text-neutral-200 font-medium"
                  options={countries}
                  required
                  name="country"
                  value={selectedCountry}
                  isLoading={countries.length == 0 ? true : false}
                  onChange={(selectedOption) => {
                    setSelectedCountry(selectedOption)
                    // setEventInfo((prev) => ({
                    //   ...prev,
                    //   country: selectedOption.label,
                    // }))
                    // fetchStateByCountry()
                  }}
                  styles={colourStyles}
                />
              </label>
              <label htmlFor="state" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  State <span className="text-red-600 font-bold">*</span>
                </p>
                <Select
                  className="w-full text-sm text-neutral-200 font-medium"
                  // options={states}
                  required
                  name="state"
                  // value={selectedstates}
                  // isLoading={states.length == 0 ? true : false}
                  // onChange={(selectedOption) => {
                  //   setSelectedstates(selectedOption)
                  //   setEventInfo((prev) => ({
                  //     ...prev,
                  //     state: selectedOption.value,
                  //   }))
                  // }}
                  styles={colourStyles}
                />
              </label>

              <label htmlFor="city" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  City <span className="text-red-600 font-bold">*</span>
                </p>
                <Select
                  className="w-full text-sm text-neutral-200 font-medium"
                  // options={city}
                  required
                  name="city"
                  // value={selectedcity}
                  // onChange={(selectedOption) => {
                  //   setSelectedcity(selectedOption)
                  //   setEventInfo((prev) => ({
                  //     ...prev,
                  //     city: selectedOption.value,
                  //   }))
                  // }}
                  styles={colourStyles}
                />
              </label>
            </div>

            <div className="mt-7 flex gap-5">
              <label htmlFor="street" className="flex flex-col gap-1">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Street <span className="text-red-600 font-bold">*</span>
                </p>
                <p className="text-sm mt-1 text-neutral-200 mb-1">
                  Enter the street address below, select from the auto complete
                  options and verify that the location appears correctly on the
                  map
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
          </form>
          <div className="mt-2">Google Map section</div>
        </section>

        <section className="flex items-center justify-end w-3/4 mx-auto">
          <button
            type="submit"
            form="generalInfoForm"
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
export default CreateEvent
