import { ChangeEvent } from 'react'

interface SocialMediaInputsProps {
  eventInfo: {
    linkedin: string
    instagram: string
    facebook: string
    twitter: string
  }
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const SocialMediaInputs = ({ eventInfo, handleChange }: SocialMediaInputsProps) => {
  return (
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
  )
}

export default SocialMediaInputs
