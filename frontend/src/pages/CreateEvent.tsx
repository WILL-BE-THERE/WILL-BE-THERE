import { ChangeEvent, FormEvent, useState } from 'react'
import { Country, State, City } from 'country-state-city'
import { FaArrowRight, FaArrowLeft, FaSpinner, FaTrash, FaPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import SocialMediaInputs from '../components/CreateEvent/SocialMediaInputs'
import ImageUploadSection from '../components/CreateEvent/ImageUploadSection'
import axios from 'axios'
import API_ENDPOINTS from '../config/api'
import generateApiHeaders from './Headers'

interface TicketType {
  name: string
  description: string
  price: string
  quantity: string
  currency: string
}

const CreateEvent = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { name: 'General Admission', description: '', price: '0', quantity: '100', currency: 'GHS' }
  ])

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
    facebook: '',
    twitter: '',
    linkedin: '',
    is_paid: false,
    price: '0',
    currency: 'GHS',
    inclusions: '',
    is_redeemable: false,
  }

  const [selectedImage, setSelectedImage] = useState('')
  const [imageUploadedMsg, setImageUploadedMsg] = useState('')
  const [eventInfo, setEventInfo] = useState(initialEventInfo)
  const [loading, setLoading] = useState(false)

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
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setEventInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleTicketChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    const updatedTickets = [...ticketTypes]
    updatedTickets[index] = { ...updatedTickets[index], [name]: value }
    setTicketTypes(updatedTickets)
  }

  const addTicketType = () => {
    setTicketTypes([...ticketTypes, { name: '', description: '', price: '0', quantity: '0', currency: 'GHS' }])
  }

  const removeTicketType = (index: number) => {
    if (ticketTypes.length === 1) return
    const updatedTickets = ticketTypes.filter((_, i) => i !== index)
    setTicketTypes(updatedTickets)
  }

  const nextStep = () => {
    if (currentStep === 1 && !eventInfo.imageSelected) {
      alert('Please select an event banner image.')
      return
    }
    if (currentStep === 2) {
      if (!eventInfo.eventName || !eventInfo.generalInfo || !eventInfo.dateOfEvent || !eventInfo.time) {
        alert('Please fill in all required general information.')
        return
      }
    }
    if (currentStep === 3) {
      if (eventInfo.country === '' || eventInfo.state === '' || eventInfo.city === '' || eventInfo.street === '') {
        alert('Please fill in all required location information.');
        return;
      }
    }
    setCurrentStep((prev) => prev + 1)
  }

  const prevStep = () => setCurrentStep((prev) => prev - 1)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

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
    formData.append('is_paid', String(eventInfo.is_paid))
    
    // Legacy support
    formData.append('price', ticketTypes[0]?.price || '0')
    formData.append('currency', ticketTypes[0]?.currency || 'GHS')
    
    formData.append('inclusions', eventInfo.inclusions)
    formData.append('is_redeemable', String(eventInfo.is_redeemable))

    // Send Ticket Types as JSON string
    const ticketsToSend = ticketTypes.map(t => ({
      ...t,
      price: parseFloat(t.price),
      quantity: parseInt(t.quantity)
    }))
    // Using simple array matching backend expectation
    ticketsToSend.forEach((ticket, index) => {
        formData.append('ticket_types', JSON.stringify(ticket))
    })


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
    } catch (error: any) {
      console.error('Error creating event:', error)
      alert(error.response?.data?.message || 'Failed to create event. Please check your links and inputs.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitImage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (eventInfo.imageSelected) {
      setImageUploadedMsg('Banner image ready.')
      nextStep()
    } else {
      alert('Please select an image first.')
    }
  }

  return (
    <div className="text-center bg-white pb-24">
      <section className="pt-8 text-center">
        <h1 className="font-bold text-3xl">Create Event</h1>
        <div className="flex justify-center items-center gap-4 mt-4 mb-6">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 1 ? 'bg-primary-100 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`h-1 w-12 rounded ${currentStep >= 2 ? 'bg-primary-100' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 2 ? 'bg-primary-100 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <div className={`h-1 w-12 rounded ${currentStep >= 3 ? 'bg-primary-100' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 3 ? 'bg-primary-100 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
          <div className={`h-1 w-12 rounded ${currentStep >= 4 ? 'bg-primary-100' : 'bg-gray-200'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${currentStep >= 4 ? 'bg-primary-100 text-white' : 'bg-gray-200 text-gray-500'}`}>4</div>
        </div>
        <p className="font-medium text-base text-neutral-200 mt-1 border-b-2 border-b-neutral-200 w-[90%] pt-3 mx-auto pb-3 mb-6 sm:w-4/5 lg:w-3/5">
          {currentStep === 1 && 'Step 1: Upload a catchy banner for your event'}
          {currentStep === 2 && 'Step 2: Tell us more about the event details'}
          {currentStep === 3 && 'Step 3: Where and how can guests find you?'}
          {currentStep === 4 && 'Step 4: Ticket Types & Pricing'}
        </p>
      </section>

      <div className="w-full mx-auto lg:w-[70%]">
        {currentStep === 1 && (
          <ImageUploadSection
            selectedImage={selectedImage}
            imageUploadedMsg={imageUploadedMsg}
            handleSubmitImage={handleSubmitImage}
            fileSelectHandleChange={fileSelectHandleChange}
          />
        )}

        {currentStep === 2 && (
          <section className="border-2 border-dashed rounded-xl border-black/30 my-10 py-6 w-[90%] mx-auto px-5 text-start sm:px-12 sm:py-12 lg:w-[75%]">
            <h1 className="font-bold mb-1 text-xl">General Information</h1>
            <div className="flex flex-col gap-4 mt-7">
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
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200"
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
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 h-32 resize-none"
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
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200"
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
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200"
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
                    className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200"
                    required
                  />
                </label>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              <button onClick={prevStep} className="flex items-center gap-2 px-4 py-2 text-primary-100 font-semibold border border-primary-100 rounded-md hover:bg-primary-100 hover:text-white transition-all">
                <FaArrowLeft /> Back
              </button>
              <button onClick={nextStep} className="flex items-center gap-2 px-6 py-2 bg-primary-100 text-white font-semibold rounded-md hover:bg-primary-200 transition-all">
                Next <FaArrowRight />
              </button>
            </div>
          </section>
        )}

        {currentStep === 3 && (
          <section className="border-2 border-dashed rounded-xl border-black/30 my-10 py-6 w-[90%] mx-auto px-5 text-start sm:px-12 sm:py-12 lg:w-[75%]">
            <h1 className="font-bold mb-1 text-xl">Location & Socials</h1>
            <form id="eventInfoForm" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-7">
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
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200"
                  required
                />
              </label>

              <SocialMediaInputs eventInfo={eventInfo} handleChange={handleChange} />

              <div className="flex justify-between mt-8 border-t border-dashed border-black/30 pt-8">
                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-4 py-2 text-primary-100 font-semibold border border-primary-100 rounded-md hover:bg-primary-100 hover:text-white transition-all">
                  <FaArrowLeft /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-3 text-white bg-primary-100 font-medium border border-primary-100 text-sm py-2 px-6 rounded-md hover:bg-primary-200 transition-all min-h-[40px]"
                >
                  Next <FaArrowRight />
                </button>
              </div>
            </form>
          </section>
        )}

        {currentStep === 4 && (
          <section className="border-2 border-dashed rounded-xl border-black/30 my-10 py-6 w-[90%] mx-auto px-5 text-start sm:px-12 sm:py-12 lg:w-[75%]">
            <h1 className="font-bold mb-1 text-xl">Tickets & Pricing</h1>
            <p className="text-sm text-neutral-200 mb-6">Create the ticket types you want to enable for this event.</p>

            <form id="pricingForm" onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                 {ticketTypes.map((ticket, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative animate-in fade-in duration-300">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="font-bold text-gray-700">Ticket Type {index + 1}</h3>
                            <button type="button" onClick={() => removeTicketType(index)} className="text-red-500 hover:text-red-700 text-sm" title="Remove Ticket">
                                <FaTrash />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             <label className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-gray-500">Name</span>
                                <input 
                                    type="text" 
                                    name="name" 
                                    value={ticket.name}
                                    placeholder="e.g. VIP, Early Bird" 
                                    onChange={(e) => handleTicketChange(index, e)}
                                    className="p-2 rounded border border-gray-300 text-sm"
                                    required
                                />
                             </label>
                             <label className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-gray-500">Quantity</span>
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    value={ticket.quantity}
                                    placeholder="Total available" 
                                    onChange={(e) => handleTicketChange(index, e)}
                                    className="p-2 rounded border border-gray-300 text-sm"
                                    required
                                />
                             </label>
                             <label className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-gray-500">Price</span>
                                <input 
                                    type="number" 
                                    name="price" 
                                    value={ticket.price}
                                    placeholder="0.00" 
                                    onChange={(e) => handleTicketChange(index, e)}
                                    className="p-2 rounded border border-gray-300 text-sm"
                                    required
                                />
                             </label>
                             <label className="flex flex-col gap-1">
                                <span className="text-xs font-bold text-gray-500">Currency</span>
                                <select 
                                    name="currency" 
                                    value={ticket.currency} 
                                    onChange={(e) => handleTicketChange(index, e)}
                                    className="p-2 rounded border border-gray-300 text-sm"
                                >
                                    <option value="GHS">GHS</option>
                                    <option value="USD">USD</option>
                                    <option value="NGN">NGN</option>
                                </select>
                             </label>
                        </div>
                    </div>
                 ))}
                 
                 <button 
                    type="button" 
                    onClick={addTicketType}
                    className="flex items-center justify-center gap-2 py-3 border-2 border-dashed border-primary-100 text-primary-100 font-bold rounded-lg hover:bg-primary-50 transition-all"
                 >
                    <FaPlus /> Add Another Ticket Type
                 </button>
              </div>

              <div className="mt-4">
                  <label htmlFor="inclusions" className="flex flex-col gap-1 w-full">
                    <p className="text-sm font-medium text-neutral-200">What's included in the cost? (General)</p>
                    <textarea
                      name="inclusions"
                      placeholder="e.g. Food, Drinks, Goody bag..."
                      value={eventInfo.inclusions}
                      onChange={handleChange}
                      className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 h-24 resize-none"
                    />
                  </label>

                  <div className="flex items-center gap-4 mt-4">
                    <input
                      type="checkbox"
                      name="is_redeemable"
                      id="is_redeemable"
                      checked={eventInfo.is_redeemable}
                      onChange={(e) => setEventInfo(prev => ({ ...prev, is_redeemable: e.target.checked }))}
                      className="w-4 h-4 cursor-pointer accent-primary-100"
                    />
                    <label htmlFor="is_redeemable" className="text-sm font-medium text-neutral-200 cursor-pointer">
                      The cost is redeemable (e.g. for food/drinks at the venue)
                    </label>
                  </div>
              </div>

              <div className="flex justify-between mt-8 border-t border-dashed border-black/30 pt-8">
                <button type="button" onClick={prevStep} className="flex items-center gap-2 px-4 py-2 text-primary-100 font-semibold border border-primary-100 rounded-md hover:bg-primary-100 hover:text-white transition-all">
                  <FaArrowLeft /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-3 text-white bg-primary-100 font-medium border border-primary-100 text-sm py-2 px-8 rounded-md hover:bg-primary-200 transition-all min-h-[40px]"
                >
                  {loading ? <FaSpinner className="animate-spin" /> : <>Complete Creation <FaArrowRight /></>}
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  )
}
export default CreateEvent
