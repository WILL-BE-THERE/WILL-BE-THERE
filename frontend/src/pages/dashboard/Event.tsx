import { ChangeEvent, FormEvent, useState } from 'react'
import { FaInfoCircle } from 'react-icons/fa'

const Event = () => {
  const initialTicketInfo = {
    name: '',
    ticketQuantity: '',
    deadline: '',
    price: '',
  }

  const [ticketInfo, setTicketInfo] = useState(initialTicketInfo)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTicketInfo((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg py-6 px-10">
      <h1 className="text-lg font-semibold">Ticket Settings</h1>
      <p>
        Create multiple event tickets, you need minimum of 1 and maximum of 5.
      </p>

      <label htmlFor="name" className="flex flex-col gap-1 mt-5">
        <p className="flex font-medium">
          Name <span className="text-red-600">*</span>
        </p>
        <input
          type="text"
          placeholder="e.g Regular"
          name="name"
          value={ticketInfo.name}
          required
          onChange={handleChange}
          className="w-full bg-[#FAF6F6] rounded-lg text-sm p-3"
        />
      </label>
      <label htmlFor="ticketQuantity" className="flex flex-col gap-1 mt-5">
        <p className="flex font-medium">
          Ticket Quantity <span className="text-red-600">*</span>
        </p>
        <input
          type="text"
          placeholder="150"
          name="ticketQuantity"
          value={ticketInfo.ticketQuantity}
          required
          onChange={handleChange}
          className="w-full bg-[#FAF6F6] rounded-lg text-sm p-3"
        />
      </label>
      <label htmlFor="deadline" className="flex flex-col gap-1 mt-5">
        <p className="flex font-medium">
          Deadline <span className="text-red-600">*</span>
        </p>
        <input
          type="text"
          placeholder="31-10-2024"
          name="deadline"
          value={ticketInfo.deadline}
          required
          onChange={handleChange}
          className="w-full bg-[#FAF6F6] rounded-lg text-sm p-3"
        />
      </label>
      <label htmlFor="price" className="flex flex-col gap-1 mt-5">
        <p className="flex font-medium">
          Price <span className="text-red-600">*</span>
        </p>
        <p className="flex text-xs gap-2 text-neutral-200 items-center">
          <FaInfoCircle /> Set as zero if you want it to be free
        </p>
        <input
          type="text"
          placeholder="NGN 5,000"
          name="price"
          value={ticketInfo.price}
          required
          onChange={handleChange}
          className="w-full bg-[#FAF6F6] rounded-lg text-sm p-3"
        />
      </label>

      <div className="w-full flex justify-end mt-8">
        <button
          type="submit"
          className="bg-primary-100 px-4 py-2 text-sm text-white font-medium rounded-md"
        >
          Save Changes
        </button>
      </div>
    </form>
  )
}
export default Event
