import { ChangeEvent, FormEvent } from 'react'
import uploadImgIcon from '../../assets/Group 26.png'

interface ImageUploadSectionProps {
  selectedImage: string
  imageUploadedMsg: string
  handleSubmitImage: (e: FormEvent<HTMLFormElement>) => void
  fileSelectHandleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const ImageUploadSection = ({
  selectedImage,
  imageUploadedMsg,
  handleSubmitImage,
  fileSelectHandleChange,
}: ImageUploadSectionProps) => {
  return (
    <section className=" mt-8 items-center w-[90%] mx-auto lg:w-[65%]">
      <p className="text-neutral-200 text-sm font-medium">
        Upload an image about your event such as event poster. It must be 1:1 or
        square in size.
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
  )
}

export default ImageUploadSection
