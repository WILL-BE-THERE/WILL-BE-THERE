import GetStartedButton from '../../components/Buttons/GetStartedButton'
import emptyStars from '../../assets/empty-star.png'

const HeroSection = () => {
  return (
    <section className="bg-white h-[30rem] w-full flex justify-center items-center text-center border border-black/10 sm:h-[30rem]">
      <div className="flex flex-col gap-8 w-[80%] m-auto sm:w-1/2">
        <article className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-10">
          <div className="flex items-center gap-3">
            <img src={emptyStars} alt="Empty stars" className="w-20" />
            <p className="text-xs font-semibold">3500+ happy customers</p>
          </div>
          <div className="flex items-center gap-3">
            <img src={emptyStars} alt="Empty stars" className="w-20" />
            <p className="text-xs font-semibold">4300+ successful events</p>
          </div>
        </article>
        <aside className="flex flex-col gap-2 sm:gap-3">
          <h1 className="text-5xl font-semibold sm:text-5xl">Will Be There</h1>
          <h2 className="text-primary-100 text-xl font-medium font-manrope sm:text-3xl">
            Your complete events solution
          </h2>
        </aside>
        <p className="text-sm w-full m-auto text-neutral-200 font-medium sm:w-3/4">
          Empower organizers to create and manage events effortlessly, while
          providing attendees with a seamless RSVP experience.
        </p>
        <div className="font-medium">
          <GetStartedButton />
        </div>
      </div>
    </section>
  )
}
export default HeroSection
