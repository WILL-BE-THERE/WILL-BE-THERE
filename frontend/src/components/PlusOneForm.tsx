import { ChangeEvent, FormEvent, useState } from 'react'

type PlusOneFormProps = {
  setComingWithFriends: React.Dispatch<React.SetStateAction<boolean>>

  setRsvpSuccessful: React.Dispatch<React.SetStateAction<boolean>>
}

const PlusOneForm = ({
  setComingWithFriends,
  setRsvpSuccessful,
}: PlusOneFormProps) => {
  const friendsDetails = {
    // list: [],
    // friendName: '',
    friend1: '',
    friend2: '',
    friend3: '',
    friend4: '',
    friend5: '',
  }
  const [friendsComing, setFriendsComing] = useState(friendsDetails)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFriendsComing((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setComingWithFriends(false)
    setRsvpSuccessful(true)
  }

  return (
    <>
      <div className="fixed top-0 left-0 h-screen w-screen bg-[#B5B5B5]/80 flex justify-center items-center z-40">
        <div className="bg-white p-6 rounded-md w-[90%] mx-auto sm:w-[25rem] lg:p-4">
          <h1 className="text-2xl mb-2 font-bold">Plus One</h1>
          <p className="text-sm mb-5">
            Please provide the name(s) of your friends so that they can be added
            to the list.
          </p>
          <form onSubmit={handleSubmit}>
            <Input
              value={friendsComing.friend1}
              handleChange={handleChange}
              name="friend1"
              isRequired={true}
            />
            <Input
              value={friendsComing.friend2}
              handleChange={handleChange}
              name="friend2"
            />
            <Input
              value={friendsComing.friend3}
              handleChange={handleChange}
              name="friend3"
            />
            <Input
              value={friendsComing.friend4}
              handleChange={handleChange}
              name="friend4"
            />
            <Input
              value={friendsComing.friend5}
              handleChange={handleChange}
              name="friend5"
            />

            <button
              type="button"
              onClick={() => setComingWithFriends(false)}
              className="px-5 py-1 border-2 border-primary-100 text-neutral-200 text-[0.95rem] rounded-md font-medium mr-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-fit py-2 px-6 mt-5 bg-blue-700 text-white rounded text-sm"
            >
              Done
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

type InputProps = {
  value: string
  name: string
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  isRequired?: boolean
}

const Input = (props: InputProps) => {
  const { value, name, handleChange, isRequired } = props
  return (
    <label htmlFor="friendName" className="flex flex-col gap-1 w-full mt-3">
      <p className="text-sm font-semibold text-neutral-200">Name</p>
      <aside className="relative flex">
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          required={isRequired === true ? true : false}
          className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-2 w-full"
        />
      </aside>
    </label>
  )
}

export default PlusOneForm
