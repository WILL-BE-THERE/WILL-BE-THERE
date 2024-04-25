import { Link } from 'react-router-dom'
import icon from '../assets/Bad_Request.png'

export default function ErrorPage() {
  return (
    <div className="bg-white pt-8">
      <section className="w-[60%] mx-auto flex flex-col gap-3 justify-center items-center text-center text-black font-medium">
        <h1 className="text-3xl font-bold mb-1 mt-12">Page not found</h1>

        <img
          src={icon}
          alt="Image showing successful creation of events"
          className="w-80 mt-12"
        />
        <Link
          to="/"
          className="mb-32 mt-12 bg-primary-100 text-white font-medium py-2 px-4 rounded-md hover:bg-primary-200 transition-all"
        >
          Back to Home page
        </Link>
      </section>
    </div>
  )
}
