import { FormEvent } from 'react'

const PlusOneForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="flex justify-center">
      <div className="border rounded shadow-md p-6 w-full max-w-md">
        <form onSubmit={handleSubmit}>form</form>
      </div>
    </div>
  )
}

export default PlusOneForm
