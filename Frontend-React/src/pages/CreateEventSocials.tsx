import { ChangeEvent, FormEvent, useState } from 'react'
import CreateEventsHeader from '../../src/components/CreateEventsHeader'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

const CreateEventSocials = () => {
  const initialSocialsLinks = {
    instagram: '',
    linkedin: '',
    facebook: '',
    twitter: '',
  }

  const [socialLinks, setSocialLinks] = useState(initialSocialsLinks)

  const navigate = useNavigate()
  const goBack = () => navigate(-1)
  const next = () => navigate('/createeventmessage')
  const location = useLocation()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSocialLinks((prevInfo) => ({ ...prevInfo, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log(socialLinks)
    next()
  }

  return (
    <div className="text-center bg-white pb-24">
      <div className="w-[70%] mx-auto">
        <CreateEventsHeader textColor={location.pathname} />

        <section className="border-2 border-dashed rounded-xl border-black/30 my-10 py-12 w-[75%] mx-auto px-12 text-start">
          <h1 className="font-bold mb-1 text-xl">Social Media Accounts</h1>
          <p className="text-neutral-200 text-base font-medium">
            Fill in your social information.
          </p>
          <form
            id="socialLinksForm"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="mt-7 flex gap-5">
              <label htmlFor="instagram" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Instagram <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="instagram"
                  placeholder="Your instagram link"
                  value={socialLinks.instagram}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
              <label htmlFor="linkedin" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Snapchat <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="Your linkedin link"
                  value={socialLinks.linkedin}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
            </div>

            <div className="mt-2 flex gap-5">
              <label htmlFor="facebook" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Facebook
                  <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="facebook"
                  placeholder="Your facebook"
                  value={socialLinks.facebook}
                  onChange={handleChange}
                  className="border-[1.5px] border-[#d6d6d6] focus:outline-[1.5px] focus:outline-primary-100 rounded-md bg-[#fafafa] px-4 py-3 text-sm text-neutral-200 placeholder:text-sm w-full"
                  required
                />
              </label>
              <label htmlFor="twitter" className="flex flex-col gap-1 w-1/2">
                <p className="flex gap-1 text-sm font-medium text-neutral-200">
                  Twitter
                  <span className="text-red-600 font-bold">*</span>
                </p>
                <input
                  type="text"
                  name="twitter"
                  placeholder="Your twitter link"
                  value={socialLinks.twitter}
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
            form="socialLinksForm"
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

export default CreateEventSocials
