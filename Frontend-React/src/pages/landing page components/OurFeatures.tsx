import { featureData } from '../../utils/local-data'

type OurFeaturesProps = (typeof featureData)[number]

const OurFeatures = (props: OurFeaturesProps) => {
  const { title, desc, img } = props
  return (
    <div className="bg-white rounded-md shadow-lg shadow-black/10 flex flex-col gap-10 p-8 items-center justify-center">
      <h1 className="text-xl font-semibold text-center">{title}</h1>
      <div className="w-[60%] h-[13rem]">
        <img src={img} alt={title} className="w-full h-full" />
      </div>
      <p className="text-center text-neutral-200 font-medium text-sm">{desc}</p>
    </div>
  )
}
export default OurFeatures
