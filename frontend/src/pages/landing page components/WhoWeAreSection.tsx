import { whoWeAreData } from '../../utils/local-data'

type WhoWeAreSectionProps = (typeof whoWeAreData)[number]

const WhoWeAreSection = (props: WhoWeAreSectionProps) => {
  const { title, text, img } = props
  return (
    <div className="bg-white rounded-md shadow-lg shadow-black/10 flex flex-col gap-10 p-8 items-center justify-center">
      <h1 className="text-xl font-semibold text-center">{title}</h1>
      <div className="w-[80%] h-[13rem]">
        <img src={img} alt={title} className="w-full h-full" />
      </div>
      <p className="text-center text-neutral-200 font-medium text-sm">{text}</p>
    </div>
  )
}
export default WhoWeAreSection
