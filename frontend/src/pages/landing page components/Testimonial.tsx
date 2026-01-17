import { testmonialData } from '../../utils/local-data'

type TestimonialProps = (typeof testmonialData)[number]

const Testimonial = (props: TestimonialProps) => {
  const { desc, img, name, occupation } = props
  return (
    <div className="bg-white shadow-black/10 rounded-lg border border-black/5 drop-shadow-md p-5 flex flex-col justify-between items-center sm:items-start sm:h-48 lg:h-52">
      <p className="text-sm font-medium text-center sm:text-start">{desc}</p>
      <section className="flex flex-col gap-3 items-center sm:flex-row">
        <div className="mt-10 sm:mt-0">
          <img src={img} alt={`${name} image`} className="w-9" />
        </div>
        <aside className="flex flex-col items-center sm:items-start">
          <h1 className="text-xs font-bold">{name}</h1>
          <p className="text-xs text-[#8E8E8E] font-medium">{occupation}</p>
        </aside>
      </section>
    </div>
  )
}
export default Testimonial
